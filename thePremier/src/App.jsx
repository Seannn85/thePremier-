import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Page/Register";
import Nav from "./Page/Nav";
import Edit from "./Page/Edit";


import MainPage from "./MainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<MainPage />} />
        <Route path="/edit" element={<Edit />} />

      </Routes>
    </>
  );
}

export default App;
