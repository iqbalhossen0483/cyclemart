import React, { createContext } from "react";
import SharedFunction from "./SharedFunction";

export const AuthFunction = createContext();

const FunctionProvider = ({ children }) => {
  const allFunction = SharedFunction();
  return (
    <AuthFunction.Provider value={allFunction}>
      {children}
    </AuthFunction.Provider>
  );
};

export default FunctionProvider;
