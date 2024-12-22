import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Nopage from "./pages/Nopage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EditorApp from "./pages/EditorApp";

const App = () => {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/editorApp/:projectID"
            element={isLoggedIn ? <EditorApp /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={isLoggedIn ? <Nopage /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
