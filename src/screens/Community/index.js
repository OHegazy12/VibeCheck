import React, { useState } from "react";
import MuiAppBar from "../../components/AppBar";
import "./style.css";
import Chats from "../../components/Chats";
import RobertPicture from "../../assets/profilepicture/image1.jpg";
import StevePicture from "../../assets/profilepicture/image2.jpg";
import { Biotech, Brush, MusicNote } from "@mui/icons-material";
import cover from "../../assets/background/img2.png";
import { Avatar, ListItemIcon } from "@mui/material";

function Community() {
  const [selecteState, setSelecteState] = useState({
    title: "Music",
    icon: <MusicNote />,
    // avatar: StevePicture,
    // subtitle: "London, UK",
  });
  const communityList = [
    {
      title: "Music",
      icon: <MusicNote />,
      // avatar: StevePicture,
      // subtitle: "London, UK",
    },
    {
      title: "Biology",
      icon: <Biotech />,
      // subtitle: "Toronto,Canada",
    },
    {
      title: "Painting",
      icon: <Brush />,
      // subtitle: "Paris, France",
    },
    // {
    //   title: "Marcus",
    //   avatar: RobertPicture,
    //   subtitle: "London, UK",
    // },
    // {
    //   title: "Gary",
    //   avatar: RobertPicture,
    //   subtitle: "Toronto,Canada",
    // },
    // {
    //   title: "Kevin",
    //   avatar: RobertPicture,
    //   subtitle: "Paris, France",
    // },
  ];
  return (
    <div className="CommunityContainer">
      <MuiAppBar />
      <div className="CommunitySection">
        <Chats
          messagesList={communityList}
          rightTitleIcon="AddCommunity"
          title="Community"
        />
        <div className="CommunityProfiles">
          <div className="CommunityProfileInfo">
            <div
              className="CommunityImage"
              style={{
                backgroundImage: cover,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            >
              {selecteState?.avatar && (
                <Avatar
                  alt="User Avatar"
                  className="CommunityAvatar"
                  src={selecteState?.avatar}
                />
              )}
              {selecteState?.icon && (
                <ListItemIcon className="CommunityAvatar">
                  {selecteState?.icon}
                </ListItemIcon>
              )}
            </div>
            <div className="CommunityName"></div>
          </div>
        </div>
        {/* <ChatMessages chatMessages={chatMessages} /> */}
      </div>
    </div>
  );
}

export default Community;
