import React, { useContext, useState } from "react";

import "./style.css";
import {
  Badge,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { GroupAdd, MoreHoriz, Search, Send } from "@mui/icons-material";
import MuiTextField from "../TextField";
import MuiListItem from "../MuiListItem";
import MuiButton from "../Button";
import { CommunityAction } from "../../context/CommunityContext";

function Chats({
  messagesList,
  handleClick,
  title,
  rightTitleIcon = "HorizontalDots",
}) {
  const { createCommunity } = useContext(CommunityAction);
  const [more, setMore] = useState(4);
  const [search, setSearch] = useState("");
  const [addCommunity, setAddCommunity] = useState(false);
  const [communityName, setCommunityName] = useState("");

  const handleAddCommunity = () => {
    createCommunity({ icon: "", title: communityName });
    setCommunityName("");
    setAddCommunity(!addCommunity);
  };

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
          {rightTitleIcon === "HorizontalDots" && (
            <IconButton color="dark">
              <MoreHoriz />
            </IconButton>
          )}
          {rightTitleIcon === "AddCommunity" && (
            <IconButton
              color="dark"
              onClick={() => setAddCommunity(!addCommunity)}
            >
              <GroupAdd />
            </IconButton>
          )}
        </div>
        {addCommunity && (
          <MuiTextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="dark" onClick={handleAddCommunity}>
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="New Community Name"
            fullWidth
            color="dark"
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}
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
            filterList.slice(0, more).map((data, index) => {
              return (
                <MuiListItem
                  title={data.title}
                  subtitle={data.subtitle}
                  avatar={data.avatar}
                  icon={data.icon}
                  onClick={() => handleClick(data)}
                  key={data?._id || index}
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
