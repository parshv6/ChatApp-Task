import React, { createContext, useContext, useReducer } from "react";

//THIS IS DATA LAYOUT
export const StateContext = createContext();

//Build a provider

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

//this is how we use it inside of a comp

export const useStateValue = () => useContext(StateContext);