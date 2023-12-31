import "./App.css";
import React, { useEffect, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Home/Nav";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import store from "./store";
import { loadUser } from "./actions/auth";
import Home from "./components/Home/Home";
import Ad from "./components/Ad/Ad";
import AdForm from "./components/Ad/AdForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import About from "./components/About/About";
import MyAuctions from "./components/Auctions/MyAuctions";
import WonAuctions from "./components/Auctions/WonAuctions";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ads/:adId" element={<Ad />} />
            <Route path="/postad" element={<AdForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/myAuctions" element={<MyAuctions />} />
            <Route exact path="/wonAuctions" element={<WonAuctions />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
