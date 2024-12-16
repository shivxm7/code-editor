import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Nopage from './pages/Nopage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import EditorApp from './pages/EditorApp';

const App = () => {
  return (
    <>
     <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/editorApp/:projectID" element={<EditorApp />} />
          <Route path="*" element={<Nopage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App