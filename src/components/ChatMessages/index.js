import React from "react";

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
import MuiTextField from "../TextField";

function ChatMessages({ chatMessages }) {
  return (
    <div className="ChatScreen">
      <div className="ChatHeader">
        <Typography variant="h5" color="#21618C" fontWeight={700}>
          Steve Rogers
        </Typography>
        <div className="ChatCommunication">
          {/* <IconButton>
            <Videocam />
          </IconButton>
          <IconButton>
            <Call />
          </IconButton> */}
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </div>
      </div>
      <div className="ChatBody">
        {chatMessages.length > 0 &&
          chatMessages.map((data) => {
            return data.type === "user" ? (
              <div className="ChatMessages">
                <Typography
                  className="UserMessages"
                  variant="body2"
                  color="#21618C"
                >
                  {data.message}
                </Typography>
                <Typography
                  color="#21618C50"
                  fontSize={12}
                  fontWeight={300}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <WatchLater fontSize="12px" /> {data.timeStamp}
                </Typography>
              </div>
            ) : (
              data.type === "mine" && (
                <div
                  className="ChatMessages"
                  style={{ alignItems: "flex-end" }}
                >
                  <Typography
                    className="MyMessages"
                    variant="body2"
                    color="#21618C"
                  >
                    {data.message}
                  </Typography>
                  <Typography
                    color="#21618C50"
                    fontSize={12}
                    fontWeight={300}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <WatchLater fontSize="12px" /> {data.timeStamp}
                  </Typography>
                </div>
              )
            );
          })}
      </div>
      <div className="ChatFooter">
        <MuiTextField
          placeholder="Write your message"
          color="light"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <AttachFile />
                </IconButton>
                <IconButton>
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
}

export default ChatMessages;
