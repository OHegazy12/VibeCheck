import React, { useContext, useState } from "react";
import MuiAppBar from "../../components/AppBar";
import "./style.css";
import Chats from "../../components/Chats";
import cover from "../../assets/background/img2.png";
import { Avatar, Divider, ListItemIcon, Typography } from "@mui/material";
import Post from "../../components/Post";
import { useNavigate } from "react-router-dom";
import {
  CommunityAction,
  CommunityContext,
} from "../../context/CommunityContext";
import { HomeContext } from "../../context/HomeContext";

function Community() {
  const { communityData, selectedCommunity } = useContext(CommunityContext);
  const { updateSelectedCommunity } = useContext(CommunityAction);
  const { homePost } = useContext(HomeContext);

  let navigate = useNavigate();
  const handlePostClick = () => {
    // console.log(location);
    return navigate("/post");
  };

  return (
    <div className="CommunityContainer">
      <MuiAppBar />
      <div className="CommunitySection">
        <Chats
          messagesList={communityData}
          rightTitleIcon="AddCommunity"
          title="Community"
          handleClick={updateSelectedCommunity}
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
              {selectedCommunity?.avatar && (
                <Avatar
                  alt="User Avatar"
                  className="CommunityAvatar"
                  src={selectedCommunity?.avatar}
                />
              )}
              {selectedCommunity?.icon && (
                <ListItemIcon className="CommunityAvatar">
                  {selectedCommunity?.icon}
                </ListItemIcon>
              )}
            </div>
            <div className="CommunityName">
              <Typography variant="h5" fontWeight={700}>
                {selectedCommunity?.title}
              </Typography>
              <Typography variant="body1">
                @{selectedCommunity?.userName}
              </Typography>
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
              {homePost?.length > 0 &&
                homePost?.map((data) => {
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
