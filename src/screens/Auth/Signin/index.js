import React, { useState } from "react";
import "./style.css";
import MuiButton from "../../../components/Button";
import { Typography } from "@mui/material";
import MuiTextField from "../../../components/TextField";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignin = () => {
    // console.log(" email: " + email);
    // console.log(" password: " + password);

    // Added by Dillon -----------------------------------
    // Connects to API locally
    let url = 'http://localhost:3001/api/login/';

    let options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: `{"email":"${email}","pass":"${password}"}`
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error('error:' + err));
    // end Dillon stuff -----------------------------------
  };

  return (
    <div className="signinContainer">
      <div className="siginBox">
        <Typography variant="h3">Sign In</Typography>

        <div className="inputBox">
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
        <div className="buttonBox">
          <MuiButton
            label="Sign In"
            onClick={handleSignin}
            variant="contained"
            color="primary"
            href="/Profile"
          />
          <MuiButton
            label="Sign up"
            variant="text"
            color="secondary"
            href="/Signup"
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
