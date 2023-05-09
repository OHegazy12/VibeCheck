import React, { createContext } from "react";

export const NotificationContext = createContext();
export const NotificationAction = createContext();

function NotificationContextProvider({ children }) {
  return (
    <NotificationContext.Provider value={{}}>
      <NotificationAction.Provider value={{}}>
        {children}
      </NotificationAction.Provider>
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;
