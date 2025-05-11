import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabses";
import { useAuth } from "./AuthContext";

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const fetchTrips = async () => {
    if (!user?.id) {
      setTrips([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from("trips")
        .select("*, trip_itinerary(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      const formattedTrips = data.map((trip) => ({
        ...trip,
        id: trip.id,
        startDate: trip.start_date,
        endDate: trip.end_date,
        image: trip.image_url,
        itinerary: trip.trip_itinerary?.sort((a, b) => a.day - b.day) || [],
      }));

      setTrips(formattedTrips);
    } catch (err) {
      console.error("Failed to fetch trips:", err);
      setError({
        message: "Failed to load trips",
        details: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Set up realtime subscriptions
  useEffect(() => {
    if (!user?.id) return;

    const tripsChannel = supabase
      .channel('trips_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trips',
          filter: `user_id=eq.${user.id}`
        },
        () => fetchTrips()
      )
      .subscribe();

    const itineraryChannel = supabase
      .channel('itinerary_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'trip_itinerary'
        },
        () => fetchTrips()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(tripsChannel);
      supabase.removeChannel(itineraryChannel);
    };
  }, [user]);

  // Initial fetch
  useEffect(() => {
    fetchTrips();
  }, [user]);

  const validateTrip = (trip) => {
    if (!trip.name) throw new Error("Trip name is required");
    if (!trip.destination) throw new Error("Destination is required");
    if (!trip.startDate || !trip.endDate) throw new Error("Dates are required");
    if (new Date(trip.startDate) > new Date(trip.endDate)) {
      throw new Error("End date must be after start date");
    }
  };

  // const addTrip = async (newTrip) => {
  //   try {
  //     validateTrip(newTrip);

  //     if (!user?.id) throw new Error("User not authenticated");

  //     const tripToInsert = {
  //       name: newTrip.name,
  //       destination: newTrip.destination,
  //       start_date: new Date(newTrip.startDate).toISOString(),
  //       end_date: new Date(newTrip.endDate).toISOString(),
  //       budget: newTrip.budget || 0,
  //       description: newTrip.description || "",
  //       status: newTrip.status || "upcoming",
  //       image_url: newTrip.image || "",
  //       user_id: user.id,
  //     };

  //     const { data: tripData, error: insertError } = await supabase
  //       .from("trips")
  //       .insert(tripToInsert)
  //       .select()
  //       .single();

  //     if (insertError) throw insertError;

  //     // Create itinerary if provided
  //     if (newTrip.itinerary?.length > 0) {
  //       const itineraryToInsert = newTrip.itinerary.map((day) => ({
  //         trip_id: tripData.id,
  //         day: day.day,
  //         date: day.date,
  //         activities: day.activities,
  //       }));

  //       const { error: itineraryError } = await supabase
  //         .from("trip_itinerary")
  //         .insert(itineraryToInsert);

  //       if (itineraryError) throw itineraryError;
  //     }

  //     // Refresh trips list
  //     await fetchTrips();

  //     return tripData.id;
  //   } catch (err) {
  //     console.error("Failed to create trip:", err);
  //     setError({
  //       message: "Failed to create trip",
  //       details: err.message,
  //     });
  //     throw err;
  //   }
  // };

  const addTrip = async (newTrip) => {
    try {
      validateTrip(newTrip);
  
      if (!user?.id) throw new Error("User not authenticated");
  
      const tripToInsert = {
        name: newTrip.name,
        destination: newTrip.destination,
        start_date: new Date(newTrip.startDate).toISOString(),
        end_date: new Date(newTrip.endDate).toISOString(),
        budget: newTrip.budget || 0,
        description: newTrip.description || "",
        status: newTrip.status || "upcoming",
        image_url: newTrip.image || "",
        user_id: user.id,
      };
  
      const { data: tripData, error: insertError } = await supabase
        .from("trips")
        .insert(tripToInsert)
        .select()
        .single();
  
      if (insertError) throw insertError;
  
      // Create itinerary if provided
      if (newTrip.itinerary?.length > 0) {
        const itineraryToInsert = newTrip.itinerary.map((day) => ({
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
  
      // Optimistically update the local state
      const formattedTrip = {
        ...tripData,
        id: tripData.id,
        startDate: tripData.start_date,
        endDate: tripData.end_date,
        image: tripData.image_url,
        itinerary: newTrip.itinerary || [],
      };
  
      setTrips(prev => [formattedTrip, ...prev]);
  
      return tripData.id;
    } catch (err) {
      console.error("Failed to create trip:", err);
      setError({
        message: "Failed to create trip",
        details: err.message,
      });
      throw err;
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
        updated_at: new Date().toISOString(),
      };

      const { error: updateError } = await supabase
        .from("trips")
        .update(tripToUpdate)
        .eq("id", updatedTrip.id);

      if (updateError) throw updateError;

      // Delete existing itinerary
      await supabase
        .from("trip_itinerary")
        .delete()
        .eq("trip_id", updatedTrip.id);

      // Insert new itinerary if exists
      if (updatedTrip.itinerary?.length > 0) {
        const itineraryToInsert = updatedTrip.itinerary.map((day) => ({
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

      await fetchTrips();
      return updatedTrip.id;
    } catch (err) {
      console.error("Failed to update trip:", err);
      setError({
        message: "Failed to update trip",
        details: err.message,
      });
      throw err;
    }
  };

  const deleteTrip = async (tripId) => {
    try {
      // Delete itinerary first
      await supabase.from("trip_itinerary").delete().eq("trip_id", tripId);
      
      // Then delete trip
      const { error: deleteError } = await supabase.from("trips").delete().eq("id", tripId);
      
      if (deleteError) throw deleteError;
      
      await fetchTrips();
    } catch (err) {
      console.error("Failed to delete trip:", err);
      setError({
        message: "Failed to delete trip",
        details: err.message,
      });
      throw err;
    }
  };

  const value = {
    trips,
    loading,
    error,
    fetchTrips,
    addTrip,
    updateTrip,
    deleteTrip,
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