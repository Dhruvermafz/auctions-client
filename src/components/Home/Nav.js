import React, { useState } from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Link,
  Avatar,
  ClickAwayListener,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material"; // Import components
import "../css/nav.css";
import logo from "../../images/nav-bar-banner.png";
import { logout } from "../../actions/auth";

const Nav = (props) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const handleAvatarClick = () => {
    setIsListOpen((prev) => !prev);
  };

  const handleListClose = () => {
    setIsListOpen(false);
  };

  return (
    <div className="nav">
      <div className="nav__group1">
        <div className="nav__image-container">
          <RouterLink to="/">
            <img className="nav__icon" src={logo} alt="navicon" />
          </RouterLink>
        </div>

        {props.isAuth && (
          <div className="nav__buttons">
            <RouterLink to="/" style={{ textDecoration: "none" }}>
              <Button>Home</Button>
            </RouterLink>

            <RouterLink to="/about" style={{ textDecoration: "none" }}>
              <Button>About Us</Button>
            </RouterLink>

            <RouterLink to="/postad" style={{ textDecoration: "none" }}>
              <Button>Post Ad</Button>
            </RouterLink>
          </div>
        )}
      </div>

      <div className="nav__group2">
        <div className="nav__account">
          {props.isAuth ? (
            <>
              {/* Profile Circle Avatar with List */}
              <Avatar
                alt="User Avatar"
                src="path_to_user_avatar.jpg"
                onClick={handleAvatarClick}
                sx={{
                  marginLeft: "10px",
                  "&:hover": {
                    border: "2px solid #ccc",
                    cursor: "pointer",
                  },
                }}
              />
              {/* List */}
              {isListOpen && (
                <ClickAwayListener onClickAway={handleListClose}>
                  <Paper
                    sx={{
                      position: "absolute",
                      top: "100%",
                      right: "10px",
                      zIndex: 1,
                    }}
                  >
                    <List>
                      <ListItem
                        button
                        component={RouterLink}
                        to="/myAuctions"
                        onClick={handleListClose}
                      >
                        <ListItemText primary="My Auctions" />
                      </ListItem>
                      <ListItem
                        button
                        component={RouterLink}
                        to="/wonAuctions"
                        onClick={handleListClose}
                      >
                        <ListItemText primary="Won Aucitons" />
                      </ListItem>
                      <ListItem
                        button
                        component={RouterLink}
                        to="/profile"
                        onClick={handleListClose}
                      >
                        <ListItemText primary="Profile" />
                      </ListItem>
                      <ListItem
                        button
                        href="#"
                        color="inherit"
                        onClick={props.logout}
                        sx={{ textDecoration: "none" }}
                      >
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </List>
                  </Paper>
                </ClickAwayListener>
              )}
            </>
          ) : (
            <RouterLink to="/login" sx={{ textDecoration: "none" }}>
              Login
            </RouterLink>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Nav);
