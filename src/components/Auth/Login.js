import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { login, skipLogin } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import "./auth.css";
import Spinner from "../Extras/Spinner";
import logo from "../../images/auctionslogo3.png";
import Alert from "../Extras/Alert";

const Login = (props) => {
  const [formData, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    props.login(email, password);
    setLoading(false);
  };

  if (props.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return props.loading ? (
    <Spinner />
  ) : (
    <>
      <section className="auth__container">
        <div className="auth">
          <div className="auth__image-container">
            <img className="app__icon" src={logo} alt="navicon" />
          </div>

          <p className="auth__subtitle">
            <i className="fas fa-user"></i>Log in to your account
          </p>

          <form
            className="form"
            onSubmit={(e) => {
              onSubmit(e);
            }}
          >
            <div className="form-group">
              <Alert /> {/* Utilize the Alert component here */}
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
                onChange={(e) => {
                  onChange(e);
                }}
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
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </div>
            <Button
              variant="contained"
              type="submit"
              className="auth__button"
              color="primary"
              disabled={loading}
            >
              {loading ? <Spinner size={24} /> : "Login"}
            </Button>
          </form>

          <p>
            Don't have an account?
            <Link to="/register">Sign Up</Link>
          </p>

          <div className="auth__separator" />
          <p>To use the app without login:</p>
          <Button
            variant="contained"
            className="auth__button"
            onClick={props.skipLogin}
          >
            Skip
          </Button>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {
  login,
  skipLogin,
  setAlert, // Use the setAlert action instead of removeAlert
})(Login);
