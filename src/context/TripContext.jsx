import React, { createContext, useState } from "react";

const TripContext = createContext();

const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  return <TripContext.Provider value={{}}>{children}</TripContext.Provider>;
};

// src/context/TripContext.js

export { TripContext, TripProvider };
