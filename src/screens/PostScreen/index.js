import React from "react";
import "./style.css";
import Post from "../../components/Post";
import postImg from "../../assets/logo.png";
import StevePicture from "../../assets/profilepicture/image2.jpg";
import { IconButton, Typography } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function PostScreen() {
  const navigate = useNavigate();
  const data = {
    name: "Steve Rogers",
    avatar: StevePicture,
    location: "London, UK",
    caption:
      "Proident sunt dolor aliqua sint quis laboris aliquip est nostrud labore exercitation. Mollit exercitation ipsum tempor magna deserunt deserunt in Lorem nostrud sunt reprehenderit reprehenderit. Eu ex dolore nisi excepteur reprehenderit esse sunt laboris ullamco sunt.",
    image: postImg,
  };
  return (
    <div className="PostScreenContainer">
      <div className="PostScreenSection">
        <div className="PostScreenBox">
          <div className="PostScreenHeader">
            <IconButton color="dark" onClick={() => navigate(-1)}>
              <ChevronLeft />
            </IconButton>
            <Typography variant="h5" fontWeight={700}>
              {data.name.split(" ")[0]}'s Post
            </Typography>
          </div>
          <Post
            userName={data.name}
            location={data.location}
            avatar={data.avatar}
            caption={data.caption}
            postImage={data.image}
            headerRightIcon="Share"
          />
        </div>
      </div>
    </div>
  );
}

export default PostScreen;
