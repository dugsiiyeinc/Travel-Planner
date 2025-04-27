import React, { createContext } from "react";

const TripContext = createContext();

const TripProvider = ({ children }) => {
  return <TripContext.Provider value={{}}>{children}</TripContext.Provider>;
};

export { TripContext, TripProvider };
