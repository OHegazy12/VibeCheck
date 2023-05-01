import React from "react";
import "./style.css";
import { Avatar, Chip, IconButton, Typography } from "@mui/material";
import { People, PersonAdd, Share } from "@mui/icons-material";

function UserHeader({ avatar, name, location, rightIcon, tag, tagVariant }) {
  return (
    <div className="UserInformation">
      {avatar && (
        <Avatar
          alt="ProfilePicture"
          src={avatar}
          sx={{ width: 65, height: 65 }}
        />
      )}
      <div className="UserInformationDetail">
        {name && <Typography variant="subtitle1">{name}</Typography>}
        <div>
          {location && (
            <Typography
              variant="subtitle2"
              fontSize={12}
              color="#cccccc"
              fontWeight={300}
            >
              {location}
            </Typography>
          )}
          {tag && (
            <Chip
              label={tag}
              icon={<People />}
              variant={tagVariant}
              sx={{ fontSize: 12, fontWeight: 300, borderRadius: 2 }}
            />
          )}
        </div>
      </div>
      {rightIcon && (
        <IconButton color="dark">
          {rightIcon === "PersonAdd" && <PersonAdd />}
          {rightIcon === "Share" && <Share />}
        </IconButton>
      )}
    </div>
  );
}

export default UserHeader;
