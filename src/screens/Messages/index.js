import React from "react";
import MuiAppBar from "../../components/AppBar";
import "./style.css";
import { IconButton, InputAdornment, Typography } from "@mui/material";
import {
  AttachFile,
  Call,
  MoreHoriz,
  Send,
  Videocam,
  WatchLater,
} from "@mui/icons-material";
import MuiTextField from "../../components/TextField";

import RobertPicture from "../../assets/profilepicture/image1.jpg";

import StevePicture from "../../assets/profilepicture/image2.jpg";
import Chats from "../../components/Chats";
import ChatMessages from "../../components/ChatMessages";

function Messages() {
  const date = new Date();
  const timestamp = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const chatMessages = [
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
  const messagesList = [
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
  return (
    <div className="MessagesContainer">
      <MuiAppBar />
      <div className="MessagesSection">
        <Chats messagesList={messagesList} />
        <ChatMessages chatMessages={chatMessages} />
      </div>
    </div>
  );
}

export default Messages;
