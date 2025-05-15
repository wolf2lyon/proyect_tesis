import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Profile } from "./components/Profile";
import { useState } from "react";
import { auth } from "./components/FireBase";
import { Predict } from "./components/Predict";
import LayoutWithNavbar from "./components/LayoutWithNavbar ";
import { Resume } from "./components/Resume";
import UserProfile from "./components/UserProfile";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Router>
      <div className="App flex h-[90vh]">
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/profile" /> : <Login />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route element={<LayoutWithNavbar/>}>
                <Route path="/predict" element={<Predict />} />
                <Route path="/reports" element={<Resume />} />
                <Route path="/config" element={<UserProfile />} />
              </Route>
            </Routes>
            <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
