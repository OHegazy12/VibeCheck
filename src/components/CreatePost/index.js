import React, { useState } from "react";
import MuiTextField from "../TextField";
import "./style.css";
import MuiButton from "../Button";
import { Divider, IconButton, InputAdornment, Typography } from "@mui/material";
import avatar from "../../assets/profilepicture/image1.jpg";
import UserHeader from "../UserHeader";
import {
  EmojiEmotions,
  LocationOn,
  MoreHoriz,
  PersonSearch,
  Photo,
  Replay,
} from "@mui/icons-material";

function CreatePost() {
  const [postText, setPostText] = useState("");
  return (
    <div className="createPostContainer">
      <Typography variant="h6">Create Post</Typography>
      <Divider
        sx={{
          borderWidth: 1,
          margin: "10px 0px",
          borderColor: "#cccccc",
          width: "100%",
        }}
      />
      <UserHeader avatar={avatar} name="Lorenzo" tag="Friends" />

      <MuiTextField
        // label="post"
        placeholder="What's on your mind?"
        variant="filled"
        color="dark"
        onChange={(event) => setPostText(event.target.value)}
        value={postText}
        fullWidth
        multiline
        rows={4}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" className="TextInputEndIcon">
              <Replay />
              <LocationOn />
            </InputAdornment>
          ),
        }}
      />
      <div className="Attachements">
        <Typography variant="body2" sx={{ display: "flex", flex: 1 }}>
          Add To Your Post
        </Typography>
        <IconButton color="dark">
          <Photo />
        </IconButton>
        <IconButton color="dark">
          <PersonSearch />
        </IconButton>
        <IconButton color="dark">
          <EmojiEmotions />
        </IconButton>
        <IconButton color="dark">
          <MoreHoriz />
        </IconButton>
      </div>
      <MuiButton label="post" variant="contained" fullWidth />
    </div>
  );
}

export default CreatePost;
