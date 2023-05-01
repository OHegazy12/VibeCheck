import React, { useState } from "react";
import "./style.css";
import MuiButton from "../../../components/Button";
import { Typography } from "@mui/material";
import MuiTextField from "../../../components/TextField";

function Signup() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = () => {
    // console.log(" username: " + userName);
    // console.log(" email: " + email);
    // console.log(" password: " + password);

    // Added by Dillon -----------------------------------
    // Connects to API locally
    let url = 'http://localhost:3001/api/signUp/';

    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: `{"email":"${email}","name":"${userName}","pass":"${password}"}`
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err));
    // end Dillon stuff -----------------------------------
  };
  return (
    <div className="signupContainer">
      <div className="signupBox">
        <Typography variant="h3">Sign Up</Typography>

        <div className="signUpInputBox">
          <MuiTextField
            label="username"
            variant="outlined"
            color="light"
            type="text"
            onChange={(event) => setUserName(event.target.value)}
            value={userName}
          />
          <MuiTextField
            label="email"
            variant="outlined"
            color="light"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <MuiTextField
            label="password"
            variant="outlined"
            color="light"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>
        {/* <div className="signUpbuttonBox">
        
      </div> */}
        <MuiButton
          label="Sign up"
          onClick={handleSignUp}
          variant="contained"
          color="light"
          fullWidth
          href="/ProfileCreation"
        />
      </div>
    </div>
  );
}

export default Signup;
