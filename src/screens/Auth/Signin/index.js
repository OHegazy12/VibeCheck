import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import MuiButton from "../../../components/Button";
import { Typography } from "@mui/material";
import MuiTextField from "../../../components/TextField";
import { AuthAction, AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Signin() {
  const { onSignin } = useContext(AuthAction);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    if (email !== "" && password !== "") {
      onSignin(email, password);
    } else {
      alert("Email or Password field is empty");
    }
    // console.log(" email: " + email);
    // console.log(" password: " + password);
  };

  useEffect(() => {
    if (user === "Logging in") {
      navigate("/Home");
    }
  }, [user]);

  return (
    <div className="signinContainer">
      <div className="siginBox">
        <Typography variant="h3">Signin</Typography>

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
            label="Signin"
            onClick={handleSignin}
            variant="contained"
            color="primary"
            // href="/Profile"
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
