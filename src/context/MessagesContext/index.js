import React, { createContext, useEffect, useState } from "react";
import RobertPicture from "../../assets/profilepicture/image1.jpg";
import StevePicture from "../../assets/profilepicture/image2.jpg";

export const MessagesContext = createContext();
export const MessagesAction = createContext();

function MessagesContextProvider({ children }) {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatList, setChatList] = useState([]);

  const date = new Date(); //instantiation
  const timestamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const ChatList = [
    {
      title: "Steve Rogers",
      avatar: StevePicture,
      subtitle: "London, UK",
    },
    {
      title: "Archie",
      avatar: RobertPicture,
      subtitle: "Toronto,Canada",
    },
    {
      title: "Melinda",
      avatar: RobertPicture,
      subtitle: "Paris, France",
    },
    {
      title: "Marcus",
      avatar: RobertPicture,
      subtitle: "London, UK",
    },
    {
      title: "Gary",
      avatar: RobertPicture,
      subtitle: "Toronto,Canada",
    },
    {
      title: "Kevin",
      avatar: RobertPicture,
      subtitle: "Paris, France",
    },
  ];

  const ChatMessages = [
    {
      message: "Hi",
      type: "mine",
      timeStamp: timestamp,
    },
    {
      message: "Hi",
      type: "user",
      timeStamp: timestamp,
    },
    {
      message: "How are you doing?",
      type: "mine",
      timeStamp: timestamp,
    },
    {
      message: "all right, and you?",
      type: "user",
      timeStamp: timestamp,
    },
    {
      message: "nothing new. How is work?",
      type: "mine",
      timeStamp: timestamp,
    },
    {
      message: "good",
      type: "user",
      timeStamp: timestamp,
    },
    {
      message: "Hi",
      type: "mine",
      timeStamp: timestamp,
    },
    {
      message: "Hi",
      type: "user",
      timeStamp: timestamp,
    },
    {
      message: "How are you doing?",
      type: "mine",
      timeStamp: timestamp,
    },
    {
      message: "all right, and you?",
      type: "user",
      timeStamp: timestamp,
    },
    {
      message: "nothing new. How is work?",
      type: "mine",
      timeStamp: timestamp,
    },
    {
      message: "good",
      type: "user",
      timeStamp: timestamp,
    },
  ];
  const getChatMessages = () => {
    // Data should be call here from the data base

    setChatMessages(ChatMessages);
  };
  const getChatList = () => {
    // Data should be call here from the data base

    setChatList(ChatList);
  };
  useEffect(() => {
    getChatMessages();
    getChatList();
  }, []);
  return (
    <MessagesContext.Provider value={{ chatMessages, chatList }}>
      <MessagesAction.Provider value={{}}>{children}</MessagesAction.Provider>
    </MessagesContext.Provider>
  );
}

export default MessagesContextProvider;
