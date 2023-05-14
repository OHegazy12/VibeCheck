import React, { useContext } from "react";
import MuiAppBar from "../../components/AppBar";
import "./style.css";
import Chats from "../../components/Chats";
import ChatMessages from "../../components/ChatMessages";
import { MessagesContext } from "../../context/MessagesContext";

function Messages() {
  const { chatMessages, chatList } = useContext(MessagesContext);

  return (
    <div className="MessagesContainer">
      <MuiAppBar />
      <div className="MessagesSection">
        <Chats messagesList={chatList} />
        <ChatMessages chatMessages={chatMessages} />
      </div>
    </div>
  );
}

export default Messages;
