import React, { useState } from "react";

import "./style.css";
import {
  Badge,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { MoreHoriz, Search } from "@mui/icons-material";
import MuiTextField from "../TextField";
import MuiListItem from "../MuiListItem";
import MuiButton from "../Button";

function Chats({ messagesList }) {
  const [more, setMore] = useState(4);
  return (
    <div className="MessagesScreen">
      <div className="Messages">
        <div className="MessagesHeader">
          <Badge badgeContent={17} color="error">
            <Typography variant="h5">Messages</Typography>
          </Badge>
          <IconButton color="dark">
            <MoreHoriz />
          </IconButton>
        </div>
        <MuiTextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          label="Search Bar"
          fullWidth
          color="dark"
        />
        <Divider
          sx={{
            borderWidth: 1,
            margin: "10px 0px",
            borderColor: "#cccccc",
            width: "100%",
          }}
        />
        <div className="ChatBox">
          {messagesList.length > 0 &&
            messagesList.slice(0, more).map((data) => {
              return (
                <MuiListItem
                  title={data.title}
                  subtitle={data.subtitle}
                  avatar={data.avatar}
                  icon={data.icon}
                />
              );
            })}
        </div>
        {messagesList.length > more && (
          <MuiButton
            label="see more"
            variant="dark"
            onClick={() => setMore(more + 3)}
          />
        )}
      </div>
    </div>
  );
}

export default Chats;
