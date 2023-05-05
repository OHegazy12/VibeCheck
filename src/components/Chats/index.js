import React, { useState } from "react";

import "./style.css";
import {
  Badge,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { GroupAdd, MoreHoriz, Search } from "@mui/icons-material";
import MuiTextField from "../TextField";
import MuiListItem from "../MuiListItem";
import MuiButton from "../Button";

function Chats({ messagesList, title, rightTitleIcon = "HorizontalDots" }) {
  const [more, setMore] = useState(4);
  const [search, setSearch] = useState("");
  const filterList = messagesList.filter(
    (data) =>
      data.title.toLowerCase().includes(search.toLowerCase()) !== false ||
      data.subtitle.toLowerCase().includes(search.toLowerCase()) !== false
  );

  return (
    <div className="MessagesScreen">
      <div className="Messages">
        <div className="MessagesHeader">
          <Badge badgeContent={messagesList.length || 0} color="success">
            <Typography variant="h5">{title || "Messages"}</Typography>
          </Badge>
          <IconButton color="dark">
            {rightTitleIcon === "HorizontalDots" && <MoreHoriz />}
            {rightTitleIcon === "AddCommunity" && <GroupAdd />}
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
          {filterList.length > 0 &&
            filterList.slice(0, more).map((data) => {
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
        {filterList.length > more && (
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
