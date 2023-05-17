import React, { useContext, useState } from "react";
import "./style.css";
import MuiButton from "../../../components/Button";
import { Avatar, IconButton, Input, Typography } from "@mui/material";
import MuiTextField from "../../../components/TextField";
import { AddAPhoto } from "@mui/icons-material";
import UploadAvatarImage from "../../../components/UploadAvatarImage";
import { AuthAction } from "../../../context/AuthContext";

function ProfileCreation() {
  const { onProfileCreation } = useContext(AuthAction);
  const [profilePicture, setProfilePicture] = useState("");
  const [profilePictureUri, setProfilePictureUri] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [DOB, setDob] = useState("");

  // const [phone, setPhone] = useState("");

  const handleProfileCreation = (e) => {
    e.preventDefault();
    console.log(" first name: " + firstName);
    console.log(" last name: " + lastName);
    console.log(" date of birth: " + DOB);
    // console.log(" phone: " + phone);
    if (firstName !== "" && DOB !== "" && profilePicture !== "") {
      onProfileCreation(firstName, lastName, DOB, profilePictureUri);
    } else {
      alert(
        "First name, Date of birth and profile picture should not be empty!"
      );
    }
  };

  return (
    <div className="ProfileCreationContainer">
      <div className="ProfileCreationBox">
        <Typography variant="h3">Profile Creation</Typography>
        <UploadAvatarImage
          image={profilePicture}
          setImage={setProfilePicture}
          setImageUri={setProfilePictureUri}
        />
        {/* <Input type="file" accept="image/*" /> */}

        <div className="ProfileCreationInputBox">
          <MuiTextField
            label="first name"
            variant="outlined"
            color="light"
            type="text"
            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
            fullWidth
          />
          <MuiTextField
            label="last name"
            variant="outlined"
            color="light"
            type="text"
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
            fullWidth
          />
          {/* <MuiTextField
            label="phone"
            variant="outlined"
            color="light"
            type="tel"
            onChange={(event) => setPhone(event.target.value)}
            value={phone}
            fullWidth
          /> */}
          <MuiTextField
            label="date of birth"
            variant="outlined"
            color="light"
            type="date"
            onChange={(event) => setDob(event.target.value)}
            value={DOB}
            fullWidth
          />
        </div>
        {/* <div className="signUpbuttonBox">
            
          </div> */}
        <MuiButton
          label="Continue"
          onClick={handleProfileCreation}
          variant="contained"
          color="light"
          fullWidth
          href="/Profile"
        />
      </div>
    </div>
  );
}

export default ProfileCreation;
