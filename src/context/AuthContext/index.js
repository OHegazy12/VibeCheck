import React, { createContext } from "react";

export const AuthContext = createContext();
export const AuthAction = createContext();

function AuthContextProvider({ children }) {
  return (
    <AuthContext.Provider value={{}}>
      <AuthAction.Provider value={{}}>{children}</AuthAction.Provider>
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
