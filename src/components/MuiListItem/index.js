import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import "./style.css";

function MuiListItem({ title, subtitle, icon, onClick, avatar }) {
  return (
    <ListItem disablePadding className="ListItem">
      <ListItemButton onClick={onClick}>
        {avatar && (
          <ListItemAvatar>
            <Avatar alt="User Avatar" src={avatar} />
          </ListItemAvatar>
        )}
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {(title || subtitle) && (
          <ListItemText primary={title} secondary={subtitle} />
        )}
      </ListItemButton>
    </ListItem>
  );
}

export default MuiListItem;
