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
import ThemeContext from "./utils/ThemeContext";
import { createTheme, ThemeProvider } from "@mui/material";
import DarkMode from "./components/Extras/DarkMode";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    }
  })

  return (
    <ThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/ads/:adId" element={<Room />} />
          <Route path="/posted" element={<AdForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route exact path="/" element={<Board />} />
        </Routes>
      </BrowserRouter>
    </Provider>
    </ThemeProvider>
  );
}

export default App;
