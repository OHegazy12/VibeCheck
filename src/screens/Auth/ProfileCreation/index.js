import React, { useState } from "react";
import "./style.css";
import MuiButton from "../../../components/Button";
import { Avatar, IconButton, Typography } from "@mui/material";
import MuiTextField from "../../../components/TextField";
import { AddAPhoto } from "@mui/icons-material";
import { useLocation } from 'react-router-dom';

function ProfileCreation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [phone, setPhone] = useState("");
  const [DOB, setDob] = useState("");
  // added by Dillon
  const [image, setImage] = useState(null);
  const location = useLocation();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  // end added by Dillon

  const handleProfileCreation = () => {
    console.log(" first name: " + firstName);
    console.log(" last name: " + lastName);
    // console.log(" phone: " + phone);
    console.log(" date of birth: " + DOB);
    console.log(" image: ", image);

    // Added by Dillon -----------------------------------
    // Connects to API locally
    let url = 'http://localhost:3001/api/ProfileCreation/';
    let formdata = new FormData()
    formdata.append("image", image)
    formdata.append("firstname", firstName)
    formdata.append("lastname", lastName)
    formdata.append("dob", DOB)
    formdata.append("email", location.state.email)
    let options = {
      method: 'POST',
      // headers: { 'Content-Type': 'multipart/form-data' },
      body: formdata
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err));
    // end Dillon stuff -----------------------------------

  };



  // image stuff
  // var myHeaders = new Headers();
  // myHeaders.append("Authorization", "f4d0de867125a97");

  // var formdata = new FormData();
  // formdata.append("sampleFile", fileInput.files[0], "/C:/Users/dillo/OneDrive/Pictures/Images to be Deleted/Screenshot_20220221-042226.jpg");

  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: formdata,
  //   redirect: 'follow'
  // };

  // fetch("localhost:3001/api/uploadImg", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
  // end image stuff

  return (
    <div className="ProfileCreationContainer">
      {/* <div>{location.state ? location.state.name:""}</div> */}
      <div className="ProfileCreationBox">
        <Typography variant="h3">Profile Creation</Typography>
        <label htmlFor="image-upload">
          <Avatar className="AddImageAvatar" src={image ? URL.createObjectURL(new Blob([image])) : undefined}>
            <AddAPhoto className="AddImageIcon" />
          </Avatar>
        </label>
        <input
          type="file"
          id="image-upload"
          accept=".jpg, .jpeg, .png"
          onChange={handleImageUpload}
          style={{ display: "none" }}
        />

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
        <MuiButton
          label="Continue"
          onClick={handleProfileCreation}
          variant="contained"
          color="light"
          fullWidth
          href="/Signin"
        />
      </div>
    </div>
  );
}

export default ProfileCreation;

