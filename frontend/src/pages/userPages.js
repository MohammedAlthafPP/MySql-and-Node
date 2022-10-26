import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "../components/Layout/ErrorPage";
import PrivateRoute from "../components/Route/PrivateRoute";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage.js";
import SuccessPage from "./SuccessPage";

function userPages() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/success" element={<PrivateRoute />}>
        <Route path="" element={<SuccessPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default userPages;
