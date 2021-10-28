import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, updateToken] = useState(localStorage.getItem("token") || "");

  localStorage.setItem("token", token);

  return (
    <AuthContext.Provider value={{ token, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
