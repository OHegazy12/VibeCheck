import { NotificationsNone } from "@mui/icons-material";
import React, { createContext, useEffect, useState } from "react";
import StevePicture from "../../assets/profilepicture/image2.jpg";

export const NotificationContext = createContext();
export const NotificationAction = createContext();

function NotificationContextProvider({ children }) {
  const [notificationList, setNotificationList] = useState([]);
  const NotificationList = [
    {
      title: "New comment",
      subtitle: "Someone has commented on your post",
      icon: <NotificationsNone />,
    },
    {
      title: "New like",
      subtitle: "Someone has liked  your photo",
      icon: <NotificationsNone />,
    },
    {
      title: "Steve tag",
      subtitle: "Steve tagged you on his post",
      avatar: StevePicture,
    },
    {
      title: "New comment",
      subtitle: "Someone has commented on your post",
      icon: <NotificationsNone />,
    },
    {
      title: "New like",
      subtitle: "Someone has liked  your photo",
      icon: <NotificationsNone />,
    },
  ];
  const getNotificationList = () => {
    // Data should be call here from the data base

    setNotificationList(NotificationList);
  };

  useEffect(() => {
    getNotificationList();
  }, []);
  return (
    <NotificationContext.Provider value={{ notificationList }}>
      <NotificationAction.Provider value={{}}>
        {children}
      </NotificationAction.Provider>
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;
