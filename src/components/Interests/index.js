import React, { useState } from "react";
import "./style.css";
import { Avatar, Chip, Typography } from "@mui/material";
import { AddBoxOutlined } from "@mui/icons-material";
import MuiButton from "../Button";

function Interests({ InterestData }) {
  const [more, setMore] = useState(3);
  return (
    <div className="InterestContainer">
      <Typography variant="h5" fontWeight={700} marginBottom={2}>
        Interests
      </Typography>
      {InterestData.map((data) => {
        return (
          <div className="UserInformation">
            <Avatar
              alt="ProfilePicture"
              sx={{
                width: 35,
                height: 35,
                backgroundColor: "transparent",
                color: "#000000",
              }}
            >
              {data.icon}
            </Avatar>
            <div className="UserInformationDetail">
              <Typography variant="subtitle1">{data.name}</Typography>
            </div>
            {data.badge && <Chip variant="success" label={data.badge} />}
          </div>
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
