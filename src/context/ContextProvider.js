import React from "react";
import AuthContextProvider from "./AuthContext";
import CommunityContextProvider from "./CommunityContext";
import HomeContextProvider from "./HomeContext";
import MessagesContextProvider from "./MessagesContext";
import NotificationContextProvider from "./NotificationContext";
import ProfileContextProvider from "./ProfileContext";

function ContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <ProfileContextProvider>
        <HomeContextProvider>
          <NotificationContextProvider>
            <MessagesContextProvider>
              <CommunityContextProvider>{children}</CommunityContextProvider>
            </MessagesContextProvider>
          </NotificationContextProvider>
        </HomeContextProvider>
      </ProfileContextProvider>
    </AuthContextProvider>
  );
}

export default ContextProvider;
