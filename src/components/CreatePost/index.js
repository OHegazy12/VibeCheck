import React, { useContext, useRef, useState } from "react";
import MuiTextField from "../TextField";
import "./style.css";
import MuiButton from "../Button";
import { Divider, IconButton, InputAdornment, Typography } from "@mui/material";
import UserHeader from "../UserHeader";
import { LocationOn, Photo, Replay } from "@mui/icons-material";
import { ProfileContext } from "../../context/ProfileContext";
import { HomeAction } from "../../context/HomeContext";

function CreatePost() {
  const { userDetails } = useContext(ProfileContext);
  const { createPost } = useContext(HomeAction);
  const fileInput = useRef();

  const [topic, setTopic] = useState("");
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState("");
  const [disbleBTN, setDisbleBTN] = useState(false);

  const handleReset = (boolean = false) => {
    setTopic("");
    setTitle("");
    setPostText("");
    setPostImage("");
    setDisbleBTN(boolean);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPostImage(file);
    // const imagePath = URL.createObjectURL(file);
    // setImage(imagePath);
  };

  const handlePost = () => {
    setDisbleBTN(true);
    if (topic !== "" && title !== "" && postText !== "") {
      createPost(topic, title, postText, postImage, handleReset);
    } else {
      alert("Topic, title and post text should not be empty!");
      setDisbleBTN(false);
    }
  };

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
      <UserHeader
        avatar={userDetails.profilePicture}
        name={userDetails.userName}
        tag="Friends"
      />
      <MuiTextField
        label="Topic"
        placeholder="what is your topic?"
        variant="filled"
        color="dark"
        onChange={(event) => setTopic(event.target.value)}
        value={topic}
        fullWidth
      />
      <MuiTextField
        label="Title"
        placeholder="Give a title to your post!"
        variant="filled"
        color="dark"
        onChange={(event) => setTitle(event.target.value)}
        value={title}
        fullWidth
        sx={{ margin: "10px 0px" }}
      />
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
          Add To Your Post {postImage?.name}
        </Typography>
        <IconButton color="dark" onClick={() => fileInput.current.click()}>
          <Photo />
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            name="file"
            hidden
            onChange={handleFileChange}
          />
        </IconButton>
        {/* <IconButton color="dark">
          <PersonSearch />
        </IconButton>
        <IconButton color="dark">
          <EmojiEmotions />
        </IconButton>
        <IconButton color="dark">
          <MoreHoriz />
        </IconButton> */}
      </div>
      <MuiButton
        label="post"
        variant="contained"
        fullWidth
        onClick={handlePost}
        disabled={disbleBTN}
      />
    </div>
  );
}

export default CreatePost;
