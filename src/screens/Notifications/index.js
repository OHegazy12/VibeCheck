import React, { useState } from "react";
import MuiAppBar from "../../components/AppBar";
import "./style.css";
import MuiListItem from "../../components/MuiListItem";
import { MoreHoriz, NotificationsNone, Search } from "@mui/icons-material";
import StevePicture from "../../assets/profilepicture/image2.jpg";
import MuiTextField from "../../components/TextField";
import {
  Badge,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import MuiButton from "../../components/Button";

function Notifications() {
  const [more, setMore] = useState(3);
  const [search, setSearch] = useState("");

  const notificationList = [
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
  const filterList = notificationList.filter(
    (data) =>
      data.title.toLowerCase().includes(search.toLowerCase()) !== false ||
      data.subtitle.toLowerCase().includes(search.toLowerCase()) !== false
  );
  return (
    <div className="NotificationsContainer">
      <MuiAppBar />
      <div className="NotificationsSection">
        <div className="NotificationsScreen">
          <div className="Notifications">
            <div className="NotificationHeader">
              <Badge badgeContent={17} color="success">
                <Typography variant="h5">Notifications</Typography>
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
            {filterList.length > more && (
              <MuiButton
                label="see more"
                variant="dark"
                onClick={() => setMore(more + 3)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
