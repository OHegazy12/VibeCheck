import React, { useContext, useState } from "react";
import "./style.css";
import MuiButton from "../../../components/Button";
import { Typography } from "@mui/material";
import MuiTextField from "../../../components/TextField";
import { AuthAction } from "../../../context/AuthContext";

function Signup() {
  const { onSignup } = useContext(AuthAction);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = () => {
    if (email !== "" && password !== "" && userName !== "") {
      onSignup(email, password, userName);
    } else {
      alert("No field should be empty!");
    }
    // console.log(" user name: " + userName);
    // console.log(" email: " + email);
    // console.log(" password: " + password);
  };
  return (
    <div className="signupContainer">
      <div className="signupBox">
        <Typography variant="h3">Sign Up</Typography>

        <div className="signUpInputBox">
          <MuiTextField
            label="user name"
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
          // href="/ProfileCreation"
        />
      </div>
    </div>
  );
}

export default Signup;
