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
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
