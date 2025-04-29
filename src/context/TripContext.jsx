import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabses";
import { useAuth } from "./AuthContext";

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTrips();
    } else {
      setTrips([]);
      setLoading(false);
    }
  }, [user]);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("trips")
        .select("*, trip_itinerary(*)")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const formattedTrips = data.map(trip => ({
        ...trip,
        startDate: trip.start_date,
        endDate: trip.end_date,
        image: trip.image_url,
        itinerary: trip.trip_itinerary?.sort((a, b) => a.day - b.day) || []
      }));
      
      setTrips(formattedTrips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTrip = async (newTrip) => {
    if (!user) throw new Error("User not authenticated");

    try {
      const tripToInsert = {
        name: newTrip.name,
        destination: newTrip.destination,
        start_date: newTrip.startDate,
        end_date: newTrip.endDate,
        budget: newTrip.budget,
        description: newTrip.description,
        status: newTrip.status || 'upcoming',
        image_url: newTrip.image,
        user_id: user.id
      };

      const { data: tripData, error: tripError } = await supabase
        .from("trips")
        .insert(tripToInsert)
        .select()
        .single();

      if (tripError) throw tripError;

      let itineraryToInsert = [];
      if (newTrip.itinerary?.length > 0) {
        itineraryToInsert = newTrip.itinerary.map((day) => ({
          trip_id: tripData.id,
          day: day.day,
          date: day.date,
          activities: day.activities,
        }));

        const { error: itineraryError } = await supabase
          .from("trip_itinerary")
          .insert(itineraryToInsert);

        if (itineraryError) throw itineraryError;
      }

      // Optimistically update the UI before refetching
      setTrips(prev => [{
        ...tripData,
        startDate: tripData.start_date,
        endDate: tripData.end_date,
        image: tripData.image_url,
        itinerary: itineraryToInsert
      }, ...prev]);

      return tripData.id;
    } catch (error) {
      console.error("Error adding trip:", error);
      throw error;
    } finally {
      await fetchTrips(); // Ensure data is fresh
    }
  };

  const updateTrip = async (updatedTrip) => {
    try {
      const tripToUpdate = {
        name: updatedTrip.name,
        destination: updatedTrip.destination,
        start_date: updatedTrip.startDate,
        end_date: updatedTrip.endDate,
        budget: updatedTrip.budget,
        description: updatedTrip.description,
        status: updatedTrip.status,
        image_url: updatedTrip.image,
        updated_at: new Date().toISOString()
      };

      const { error: tripError } = await supabase
        .from("trips")
        .update(tripToUpdate)
        .eq("id", updatedTrip.id);

      if (tripError) throw tripError;

      if (updatedTrip.itinerary) {
        await supabase
          .from("trip_itinerary")
          .delete()
          .eq("trip_id", updatedTrip.id);

        if (updatedTrip.itinerary.length > 0) {
          await supabase
            .from("trip_itinerary")
            .insert(updatedTrip.itinerary.map(day => ({
              trip_id: updatedTrip.id,
              day: day.day,
              date: day.date,
              activities: day.activities,
            })));
        }
      }

      await fetchTrips();
    } catch (error) {
      console.error("Error updating trip:", error);
      throw error;
    }
  };

  const deleteTrip = async (tripId) => {
    try {
      await supabase
        .from("trip_itinerary")
        .delete()
        .eq("trip_id", tripId);

      await supabase
        .from("trips")
        .delete()
        .eq("id", tripId);

      setTrips(prev => prev.filter(trip => trip.id !== tripId));
    } catch (error) {
      console.error("Error deleting trip:", error);
      throw error;
    }
  };

  const value = {
    trips,
    loading,
    addTrip,
    updateTrip,
    deleteTrip,
    fetchTrips,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
};