import React, { useState } from "react";
import "./style.css";
import { Typography } from "@mui/material";
import { AddBoxOutlined } from "@mui/icons-material";
import MuiButton from "../Button";
import UserHeader from "../UserHeader";

function Interests({ InterestData }) {
  const [more, setMore] = useState(3);
  return (
    <div className="InterestContainer">
      <Typography variant="h5" fontWeight={700} marginBottom={2}>
        Interests
      </Typography>
      {InterestData.map((data) => {
        return (
          <UserHeader
            leftIcon={data.icon}
            name={data.name || data.title}
            badge={data.badge}
          />
        );
      })}

      <MuiButton
        startIcon={<AddBoxOutlined />}
        label="add new interest"
        variant="dark"
        onClick={() => setMore(more + 3)}
      />
    </div>
  );
}

export default Interests;
