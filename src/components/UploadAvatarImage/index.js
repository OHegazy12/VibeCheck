import { AddAPhoto } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useRef } from "react";
import "./style.css";

function UploadAvatarImage({ image, setImage }) {
  const fileInput = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imagePath = URL.createObjectURL(file);
    setImage(imagePath);
  };
  return (
    <IconButton onClick={() => fileInput.current.click()}>
      {image !== "" ? (
        <Avatar className="AddImageAvatar" src={image} />
      ) : (
        <AddAPhoto className="AddImageIcon" />
      )}

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        name="file"
        hidden
        onChange={handleFileChange}
      />
    </IconButton>
  );
}

export default UploadAvatarImage;
