import React, { createContext } from "react";

export const MessagesContext = createContext();
export const MessagesAction = createContext();

function MessagesContextProvider({ children }) {
  return (
    <MessagesContext.Provider value={{}}>
      <MessagesAction.Provider value={{}}>{children}</MessagesAction.Provider>
    </MessagesContext.Provider>
  );
}

export default MessagesContextProvider;
