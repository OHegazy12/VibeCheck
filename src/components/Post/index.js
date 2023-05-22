import React, { useState } from "react";
import {
  Avatar,
  Badge,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { BookmarkBorder, Comment, Send, ThumbUp } from "@mui/icons-material";
import "./style.css";
import UserHeader from "../UserHeader";
import MuiTextField from "../TextField";

function Post({
  userName,
  location,
  caption,
  postImage,
  avatar,
  onPostBodyClick,
  headerRightIcon,
  handleHeaderRightIcon,
  title,
  // id,
}) {
  const [showComment, setShowComment] = useState(false);
  return (
    <div className="PostBox">
      <UserHeader
        avatar={avatar}
        name={userName}
        location={location}
        rightIcon={headerRightIcon || "PersonAdd"}
        handleRightIcon={handleHeaderRightIcon}
      />

      <div className="PostBody" onClick={onPostBodyClick}>
        {/* Checks if the caption prop is truthy.If it is, then it renders a typography  */}
        {title && <Typography variant="h5">{title}</Typography>}
        {caption && <Typography variant="body1">{caption}</Typography>}
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
        <IconButton color="dark" onClick={() => setShowComment(!showComment)}>
          <Badge badgeContent={50}>
            <Comment />
          </Badge>
        </IconButton>
        <IconButton color="dark">
          <BookmarkBorder />
        </IconButton>
      </div>
      {showComment && (
        <div className="postComments">
          <MuiTextField
            placeholder="comments"
            color="dark"
            fullWidth
            multiline
            style={{ borderRadius: 100 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {avatar && (
                    <Avatar
                      alt="ProfilePicture"
                      src={avatar}
                      sx={{ width: 35, height: 35 }}
                    />
                  )}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Send />
                </InputAdornment>
              ),
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Post;
