import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { setAlert } from "../../actions/alert";
import { removeAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import "./auth.css";
import Spinner from "../Extras/Spinner";
import logo from "../../images/auctionslogo3.png";
import Alert from "../Extras/Alert";

const Register = ({ setAlert, register, isAuth, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2, address, phone } = formData;

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "error");
    } else {
      register({ name, email, password, address, phone });
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return loading ? (
    <Spinner />
  ) : (
    <section className="auth__container">
      <div className="auth">
        <div className="auth__image-container">
          <img className="app__icon" src={logo} alt="navicon" />
        </div>
        <h1 className="auth__title">Sign Up</h1>
        <p className="auth__subtitle">
          <i className="fas fa-user"></i> Create Your Account
        </p>

        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <Alert />
          </div>
          <div className="form-group">
            <TextField
              className="auth__text-field"
              size="small"
              variant="outlined"
              type="text"
              placeholder="Username"
              name="name"
              required
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <TextField
              className="auth__text-field"
              size="small"
              variant="outlined"
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <TextField
              className="auth__text-field"
              size="small"
              variant="outlined"
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <TextField
              className="auth__text-field"
              size="small"
              variant="outlined"
              type="text"
              placeholder="Phone"
              name="phone"
              value={phone}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <TextField
              className="auth__text-field"
              size="small"
              variant="outlined"
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <TextField
              className="auth__text-field"
              size="small"
              variant="outlined"
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={onChange}
            />
          </div>
          <Button
            variant="contained"
            type="submit"
            className="auth__button"
            value="Register"
            color="primary"
          >
            Register
          </Button>
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuth: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { setAlert, removeAlert, register })(
  Register
);
