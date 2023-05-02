import React, { useState } from "react";
import MuiAppBar from "../../components/AppBar";
import "./style.css";
import {
  Badge,
  Divider,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { MoreHoriz, Search } from "@mui/icons-material";
import MuiTextField from "../../components/TextField";
import MuiListItem from "../../components/MuiListItem";
import MuiButton from "../../components/Button";
import RobertPicture from "../../assets/profilepicture/image1.jpg";
import postImg from "../../assets/logo.png";
import StevePicture from "../../assets/profilepicture/image2.jpg";

function Messages() {
  const [more, setMore] = useState(4);
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
      </div>
    </div>
  );
}

export default Messages;
