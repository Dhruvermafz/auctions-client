import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import "../css/home.css";
import Board from "../Dashboard/Board";
import Alert from "../Extras/Alert";
import Footer from "./Footer";

const Home = (props) => {
  if (!props.isAuth) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="home">
      <div className="alert__display">
        <Alert />
      </div>

      <div className="alert__board">
        <Board />
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Home);
