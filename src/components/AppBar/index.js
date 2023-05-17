import {
  AccountCircle,
  AccountCircleOutlined,
  Diversity2,
  Diversity2TwoTone,
  Home,
  HomeOutlined,
  Logout,
  Mail,
  MailLockOutlined,
  MailOutline,
  Menu as MenuIcon,
  More as MoreIcon,
  Notifications as NotificationsIcon,
  NotificationsOutlined,
  Search,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
import React, { useContext } from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import MuiTextField from "../TextField";
import logo from "../../assets/new-logo.png";
import { AuthAction } from "../../context/AuthContext";

function MuiAppBar() {
  const { onLogOut } = useContext(AuthAction);
  const { state, pathname } = useLocation();
  console.log("hello ", state, pathname);

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <AppBar position="fixed" color="light">
        <Toolbar>
          {/* <IconButton size="large" edge="start" color="dark" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="black"
            sx={{
              display: { xs: "none", sm: "block" },
              width: "400px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            Vibe
            <img src={logo} alt="Logo" className="logo" />
            Check
          </Typography>

          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Link to="/Home">
              <IconButton
                size="large"
                edge="end"
                // onClick={handleProfileMenuOpen}
                color="dark"
                className="AppIconButton"
              >
                {pathname === "/Home" ? <Home /> : <HomeOutlined />}
              </IconButton>
            </Link>
            <Link to="/Community">
              <IconButton
                size="large"
                edge="end"
                // onClick={handleProfileMenuOpen}
                color="dark"
                className="AppIconButton"
              >
                {pathname === "/Community" ? (
                  <Diversity2 />
                ) : (
                  <Diversity2TwoTone />
                )}
              </IconButton>
            </Link>
            <Link to="/Messages">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="dark"
                className="AppIconButton"
              >
                <Badge badgeContent={4} color="success">
                  {pathname === "/Messages" ? <Mail /> : <MailOutline />}
                </Badge>
              </IconButton>
            </Link>
            <Link to="/Notifications">
              <IconButton size="large" color="dark" className="AppIconButton">
                <Badge badgeContent={17} color="success">
                  {pathname === "/Notifications" ? (
                    <NotificationsIcon />
                  ) : (
                    <NotificationsOutlined />
                  )}
                </Badge>
              </IconButton>
            </Link>
            <Link to="/Profile">
              <IconButton
                size="large"
                edge="end"
                // onClick={handleProfileMenuOpen}
                color="dark"
                className="AppIconButton"
              >
                {pathname === "/Profile" ? (
                  <AccountCircle />
                ) : (
                  <AccountCircleOutlined />
                )}
              </IconButton>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              // onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          <MuiTextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            label="Search Bar"
            sx={{ width: "300px", borderColor: "#000000" }}
          />

          <IconButton
            onClick={onLogOut}
            size="large"
            edge="start"
            color="error"
            sx={{ ml: 2 }}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu}
      {renderMenu} */}
    </Box>
  );
}

export default MuiAppBar;
