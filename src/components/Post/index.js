import React from "react";
import { Badge, IconButton, Typography } from "@mui/material";
import { BookmarkBorder, Comment, ThumbUp } from "@mui/icons-material";
import "./style.css";
import UserHeader from "../UserHeader";

function Post({ userName, location, caption, postImage, avatar }) {
  return (
    <div className="PostBox">
      <UserHeader
        avatar={avatar}
        name={userName}
        location={location}
        rightIcon="PersonAdd"
      />

      <div className="PostBody">
        {/* Checks if the caption prop is truthy.If it is, then it renders a typography  */}
        {caption && <Typography variant="caption">{caption}</Typography>}
        {postImage && (
          // check if the postImage is truthy. If it is, then it renders an 'img' element with the 'src' attribute
          <img src={postImage} alt="Post Image" className="PostImage" />
        )}
      </div>
      <div className="PostFooter">
        <IconButton color="dark">
          <Badge badgeContent={200}>
            <ThumbUp />
          </Badge>
        </IconButton>
        <IconButton color="dark">
          <Badge badgeContent={50}>
            <Comment />
          </Badge>
        </IconButton>
        <IconButton color="dark">
          <BookmarkBorder />
        </IconButton>
      </div>
    </div>
  );
}

export default Post;
