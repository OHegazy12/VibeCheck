import React, { useState } from "react";
import MuiAppBar from "../../components/AppBar";
import "./style.css";
import Chats from "../../components/Chats";
import RobertPicture from "../../assets/profilepicture/image1.jpg";
import StevePicture from "../../assets/profilepicture/image2.jpg";
import { Biotech, Brush, MusicNote } from "@mui/icons-material";
import cover from "../../assets/background/img2.png";
import { Avatar, Divider, ListItemIcon, Typography } from "@mui/material";
import Post from "../../components/Post";
import postImg from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function Community() {
  const [selecteState, setSelecteState] = useState({
    title: "Music",
    icon: <MusicNote />,
    // avatar: StevePicture,
    // subtitle: "London, UK",
  });
  let navigate = useNavigate();
  const handlePostClick = () => {
    // console.log(location);
    return navigate("/post");
  };
  const UserPost = [
    {
      name: "Steve Rogers",
      avatar: StevePicture,
      location: "London, UK",
      caption: "My new house",
      image: postImg,
    },
    {
      name: "Archie",
      avatar: RobertPicture,
      location: "Toronto,Canada",
      caption: "Amaizing view",
    },
    {
      name: "Melinda",
      avatar: RobertPicture,
      location: "Paris, France",
      caption: "My new house",
      image: postImg,
    },
    {
      name: "Marcus",
      avatar: RobertPicture,
      location: "London, UK",
      image: postImg,
    },
    {
      name: "Gary",
      avatar: RobertPicture,
      location: "Toronto,Canada",
      caption: "My new house",
      image: postImg,
    },
    {
      name: "Kevin",
      avatar: RobertPicture,
      location: "Paris, France",
    },
  ];
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
                background: `url(${cover})`,
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
            <div className="CommunityName">
              <Typography variant="h5" fontWeight={700}>
                Music
              </Typography>
              <Typography variant="body1">@music</Typography>
            </div>
            <div className="CommunityPost">
              <Typography variant="h4" fontWeight={700} sx={{ width: "100%" }}>
                Posts
              </Typography>
              <Divider
                sx={{
                  borderWidth: 1,
                  margin: "10px 0px",
                  borderColor: "#cccccc",
                  width: "100%",
                }}
              />
              {UserPost.map((data) => {
                return (
                  <Post
                    userName={data.name}
                    location={data.location}
                    avatar={data.avatar}
                    caption={data.caption}
                    postImage={data.image}
                    onPostBodyClick={() => handlePostClick()}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/* <ChatMessages chatMessages={chatMessages} /> */}
      </div>
    </div>
  );
}

export default Community;
