import React from "react";
import AuthContextProvider from "./AuthContext";
import CommunityContextProvider from "./CommunityContext";
import HomeContextProvider from "./HomeContext";
import MessagesContextProvider from "./MessagesContext";
import NotificationContextProvider from "./NotificationContext";
import ProfileContextProvider from "./ProfileContext";
import SearchContextProvider from "./SearchContext";

function ContextProvider({ children }) {
  return (
    <AuthContextProvider>
      <SearchContextProvider>
        <ProfileContextProvider>
          <HomeContextProvider>
            <NotificationContextProvider>
              <MessagesContextProvider>
                <CommunityContextProvider>{children}</CommunityContextProvider>
              </MessagesContextProvider>
            </NotificationContextProvider>
          </HomeContextProvider>
        </ProfileContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  );
}

export default ContextProvider;
