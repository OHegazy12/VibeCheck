import React, { useState } from "react";
import "./style.css";
import MuiButton from "../../../components/Button";
import { Avatar, Typography } from "@mui/material";
import MuiTextField from "../../../components/TextField";
import { AddAPhoto } from "@mui/icons-material";

function ProfileCreation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [phone, setPhone] = useState("");
  const [DOB, setDob] = useState("");
  const handleProfileCreation = () => {
    // console.log(" first name: " + firstName);
    // console.log(" last name: " + lastName);
    // // console.log(" phone: " + phone);
    // console.log(" date of birth: " + DOB);

    // Added by Dillon -----------------------------------
    // Connects to API locally
    let url = 'http://localhost:3001/api/ProfileCreation/';

    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: `{"firstname":"${firstName}","lastname":"${lastName}","dob":"${DOB}"}`
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err));
    // end Dillon stuff -----------------------------------

  };
  return (
    <div className="ProfileCreationContainer">
      <div className="ProfileCreationBox">
        <Typography variant="h3">Profile Creation</Typography>
        <Avatar className="AddImageAvatar">
          <AddAPhoto className="AddImageIcon" />
        </Avatar>

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
