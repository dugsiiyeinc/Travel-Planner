import React, { createContext, useEffect, useState } from "react";
import sampleTrips from '../data/trips.json';

const TripContext = createContext();

const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const savedTrips = localStorage.getItem('trips');
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    } else {
      setTrips(sampleTrips);
      localStorage.setItem('trips', JSON.stringify(sampleTrips));
    }
  }, []);
  return <TripContext.Provider value={{}}>{children}</TripContext.Provider>;
};

// src/context/TripContext.js

export { TripContext, TripProvider };
