import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabses";
import { useAuth } from "./AuthContext";

export const TripContext = createContext();

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // Load trips from localStorage on initial load
  useEffect(() => {
    const loadTrips = () => {
      const savedTrips = localStorage.getItem("trips");
      if (savedTrips) {
        try {
          const parsedTrips = JSON.parse(savedTrips);
          if (Array.isArray(parsedTrips)) {
            setTrips(parsedTrips);
            // Verify these trips belong to current user
            if (
              user?.id &&
              parsedTrips.some((trip) => trip.user_id === user.id)
            ) {
              return parsedTrips;
            }
          }
        } catch (e) {
          console.error("Failed to parse saved trips", e);
          localStorage.removeItem("trips");
        }
      }
      return null;
    };

    loadTrips();
  }, [user]);

  // Save trips to localStorage whenever they change
  useEffect(() => {
    if (trips.length > 0) {
      localStorage.setItem("trips", JSON.stringify(trips));
    } else {
      localStorage.removeItem("trips");
    }
  }, [trips]);

  const validateTrip = (trip) => {
    if (!trip.name) throw new Error("Trip name is required");
    if (!trip.destination) throw new Error("Destination is required");
    if (!trip.startDate || !trip.endDate) throw new Error("Dates are required");
    if (new Date(trip.startDate) > new Date(trip.endDate)) {
      throw new Error("End date must be after start date");
    }
  };

  const fetchTrips = async () => {
    if (!user?.id) {
      setTrips([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("trips")
        .select("*, trip_itinerary(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formattedTrips = data.map((trip) => ({
        ...trip,
        id: trip.id,
        startDate: trip.start_date,
        endDate: trip.end_date,
        image: trip.image_url,
        itinerary: trip.trip_itinerary?.sort((a, b) => a.day - b.day) || [],
      }));

      setTrips(formattedTrips);
    } catch (error) {
      console.error("Fetch trips error:", error);
      setError({
        message: "Failed to load trips",
        details: error.message,
      });

      // If fetch fails, try to load from localStorage again
      const savedTrips = localStorage.getItem("trips");
      if (savedTrips) {
        try {
          const parsedTrips = JSON.parse(savedTrips);
          if (Array.isArray(parsedTrips)) {
            // Filter trips to only show those belonging to current user
            const userTrips = parsedTrips.filter(
              (trip) => trip.user_id === user?.id
            );
            setTrips(userTrips);
          }
        } catch (e) {
          console.error("Failed to parse saved trips", e);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTrips();
    } else {
      setTrips([]);
    }
  }, [user]);

  const addTrip = async (newTrip) => {
    let tempId;
    try {
      validateTrip(newTrip);

      if (!user?.id) throw new Error("User not authenticated");

      tempId = `temp-${Date.now()}`;
      const optimisticTrip = {
        ...newTrip,
        id: tempId,
        created_at: new Date().toISOString(),
        user_id: user.id,
        status: newTrip.status || "upcoming",
        isOptimistic: true,
      };

      // Optimistic update
      setTrips((prev) => [optimisticTrip, ...prev]);

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
        itinerary: itineraryToInsert,
        isOptimistic: false,
      };

      // Replace optimistic trip with real data
      setTrips((prev) => [createdTrip, ...prev.filter((t) => t.id !== tempId)]);

      return tripData.id;
    } catch (error) {
      console.error("Add trip error:", error);
      if (tempId) {
        setTrips((prev) => prev.filter((t) => t.id !== tempId));
      }
      setError({
        message: "Failed to create trip",
        details: error.message,
      });
      throw error;
    }
  };

  const updateTrip = async (updatedTrip) => {
    try {
      validateTrip(updatedTrip);

      // Optimistic update
      setTrips((prev) =>
        prev.map((trip) =>
          trip.id === updatedTrip.id
            ? {
                ...updatedTrip,
                isOptimistic: true,
              }
            : trip
        )
      );

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

      // Update local state with confirmed data
      setTrips((prev) =>
        prev.map((trip) =>
          trip.id === updatedTrip.id
            ? {
                ...updatedTrip,
                startDate: updatedTrip.startDate,
                endDate: updatedTrip.endDate,
                image: updatedTrip.image,
                itinerary: updatedTrip.itinerary || [],
                isOptimistic: false,
              }
            : trip
        )
      );

      return updatedTrip.id;
    } catch (error) {
      console.error("Update trip error:", error);
      setTrips((prev) =>
        prev.map((trip) =>
          trip.id === updatedTrip.id
            ? {
                ...trip,
                isOptimistic: false,
              }
            : trip
        )
      );
      setError({
        message: "Failed to update trip",
        details: error.message,
      });
      throw error;
    }
  };

  const deleteTrip = async (tripId) => {
    try {
      // Optimistic update
      setTrips((prev) => prev.filter((trip) => trip.id !== tripId));

      // Delete itinerary first
      await supabase.from("trip_itinerary").delete().eq("trip_id", tripId);

      // Then delete trip
      const { error } = await supabase.from("trips").delete().eq("id", tripId);

      if (error) throw error;
    } catch (error) {
      console.error("Delete trip error:", error);
      fetchTrips(); // Restore state if deletion failed
      setError({
        message: "Failed to delete trip",
        details: error.message,
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
