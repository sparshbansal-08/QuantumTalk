import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Project from "../screens/Project";
import ErrorBoundary from "../screens/ErrorBoundary";
const AppRoutes = () => {
  return (
    <BrowserRouter>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home/>} />   
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project" element={<Project />} />

      </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRoutes;
