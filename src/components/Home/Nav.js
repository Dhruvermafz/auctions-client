import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Button, Link } from "@mui/material";
import "../css/nav.css";
import logo from "../../images/nav-bar-banner.png";
import { logout } from "../../actions/auth";

const Nav = (props) => {
  return (
    <div className="nav">
      <div className="nav__group1">
        <div className="nav__image-container">
          <RouterLink to="/">
            <img className="nav__icon" src={logo} alt="navicon" href="/" />
          </RouterLink>
        </div>

        {props.isAuth && (
          <div className="nav__buttons">
            <RouterLink to="/" style={{ textDecoration: "none" }}>
              <Button>Home</Button>
            </RouterLink>

            <RouterLink to="/dashboard" style={{ textDecoration: "none" }}>
              <Button>Dashboard</Button>
            </RouterLink>

            <RouterLink to="/posted" style={{ textDecoration: "none" }}>
              <Button>Post Ad</Button>
            </RouterLink>
          </div>
        )}
      </div>

      <div className="nav__group2">
        <div className="nav__account">
          {props.isAuth ? (
            <Link
              href="#"
              color="inherit"
              onClick={props.logout}
              sx={{ textDecoration: "none" }}
            >
              Logout
            </Link>
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
