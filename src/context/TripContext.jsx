import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabses";
import { useAuth } from "./AuthContext";

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const validateTrip = (trip) => {
    if (!trip.name) throw new Error("Trip name is required");
    if (!trip.destination) throw new Error("Destination is required");
    if (!trip.startDate || !trip.endDate) throw new Error("Dates are required");
    if (new Date(trip.startDate) > new Date(trip.endDate)) {
      throw new Error("End date must be after start date");
    }
  };

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
    setError(null);
    try {
      const { data, error } = await supabase
        .from("trips")
        .select("*, trip_itinerary(*)")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      const formattedTrips = data.map(trip => ({
        ...trip,
        id: trip.id,
        name: trip.name,
        destination: trip.destination,
        startDate: trip.start_date,
        endDate: trip.end_date,
        budget: trip.budget,
        description: trip.description,
        status: trip.status,
        image: trip.image_url,
        itinerary: trip.trip_itinerary?.sort((a, b) => a.day - b.day) || []
      }));
      
      setTrips(formattedTrips);
    } catch (error) {
      console.error("Fetch trips error:", error);
      setError({
        message: "Failed to load trips",
        details: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const addTrip = async (newTrip) => {
    let tempId;
    try {
      validateTrip(newTrip);
      
      if (!user) throw new Error("User not authenticated");

      tempId = `temp-${Date.now()}`;
      const optimisticTrip = {
        ...newTrip,
        id: tempId,
        created_at: new Date().toISOString(),
        user_id: user.id,
        status: newTrip.status || 'upcoming'
      };

      setTrips(prev => [optimisticTrip, ...prev]);

      const tripToInsert = {
        name: newTrip.name,
        destination: newTrip.destination,
        start_date: new Date(newTrip.startDate).toISOString(),
        end_date: new Date(newTrip.endDate).toISOString(),
        budget: newTrip.budget || 0,
        description: newTrip.description || '',
        status: newTrip.status || 'upcoming',
        image_url: newTrip.image || '',
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

      const createdTrip = {
        ...tripData,
        startDate: tripData.start_date,
        endDate: tripData.end_date,
        image: tripData.image_url,
        itinerary: itineraryToInsert
      };

      setTrips(prev => [
        createdTrip,
        ...prev.filter(t => t.id !== tempId)
      ]);

      return tripData.id;
    } catch (error) {
      console.error("Add trip error:", error);
      if (tempId) {
        setTrips(prev => prev.filter(t => t.id !== tempId));
      }
      setError({
        message: "Failed to create trip",
        details: error.message
      });
      throw error;
    }
  };

  const updateTrip = async (updatedTrip) => {
    try {
      validateTrip(updatedTrip);
      
      const tripToUpdate = {
        name: updatedTrip.name,
        destination: updatedTrip.destination,
        start_date: new Date(updatedTrip.startDate).toISOString(),
        end_date: new Date(updatedTrip.endDate).toISOString(),
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

      // Delete existing itinerary
      await supabase
        .from("trip_itinerary")
        .delete()
        .eq("trip_id", updatedTrip.id);

      // Insert new itinerary if exists
      if (updatedTrip.itinerary?.length > 0) {
        const itineraryToInsert = updatedTrip.itinerary.map(day => ({
          trip_id: updatedTrip.id,
          day: day.day,
          date: day.date,
          activities: day.activities,
        }));

        const { error: itineraryError } = await supabase
          .from("trip_itinerary")
          .insert(itineraryToInsert);

        if (itineraryError) throw itineraryError;
      }

      // Update local state
      setTrips(prev => prev.map(trip => 
        trip.id === updatedTrip.id ? {
          ...updatedTrip,
          startDate: updatedTrip.startDate,
          endDate: updatedTrip.endDate,
          image: updatedTrip.image,
          itinerary: updatedTrip.itinerary || []
        } : trip
      ));

      return updatedTrip.id;
    } catch (error) {
      console.error("Update trip error:", error);
      setError({
        message: "Failed to update trip",
        details: error.message
      });
      throw error;
    }
  };

  const deleteTrip = async (tripId) => {
    try {
      // Delete itinerary first
      await supabase
        .from("trip_itinerary")
        .delete()
        .eq("trip_id", tripId);

      // Then delete trip
      const { error } = await supabase
        .from("trips")
        .delete()
        .eq("id", tripId);

      if (error) throw error;

      // Update local state
      setTrips(prev => prev.filter(trip => trip.id !== tripId));
    } catch (error) {
      console.error("Delete trip error:", error);
      setError({
        message: "Failed to delete trip",
        details: error.message
      });
      throw error;
    }
  };

  const value = {
    trips,
    loading,
    error,
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