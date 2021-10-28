import React, { createContext, useState } from "react";

export const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [similar, updateSimilar] = useState(
    JSON.parse(localStorage.getItem("similar"))
  );

  localStorage.setItem("similar", JSON.stringify(similar));

  return (
    <MovieContext.Provider value={{ similar, updateSimilar }}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
