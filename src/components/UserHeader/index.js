import React from "react";
import "./style.css";
import { Avatar, Chip, IconButton, Typography } from "@mui/material";
import { Delete, People, PersonAdd, Remove, Share } from "@mui/icons-material";

function UserHeader({
  avatar,
  name,
  location,
  rightIcon,
  handleRightIcon,
  tag,
  tagVariant,
  leftIcon,
  badge,
  badgeColor,
}) {
  return (
    <div className="UserInformation">
      {leftIcon && (
        <Avatar
          alt="leftIcon"
          sx={{ width: 35, height: 35, backgroundColor: "black" }}
        >
          {leftIcon}
        </Avatar>
      )}
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
      {badge && (
        <Chip
          label={badge}
          color={badgeColor || "success"}
          sx={{ fontSize: 12, fontWeight: 300, borderRadius: 2, height: 25 }}
        />
      )}
      {rightIcon && (
        <IconButton color="dark" onClick={handleRightIcon}>
          {rightIcon === "PersonAdd" && <PersonAdd />}
          {rightIcon === "Share" && <Share />}
          {rightIcon === "Remove" && <Delete />}
        </IconButton>
      )}
    </div>
  );
}

export default UserHeader;
