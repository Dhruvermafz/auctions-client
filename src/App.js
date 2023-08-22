import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Home/Nav";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import store from "./store";
import { useEffect } from "react";
import { loadUser } from "./actions/auth";
import Home from "./components/Home/Home";
import Ad from "./components/Ad/Ad";
import AdForm from "./components/Ad/AdForm";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import Room from "./components/Room/Room";
import Board from "./components/Dashboard/Board";
import Settings from "./components/Home/Settings";
import Card from "./components/Dashboard/Card";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ads/:adId" element={<Card />} />
          <Route path="/postad" element={<AdForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route exact path="/" element={<Board />} />
          <Route exact path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
