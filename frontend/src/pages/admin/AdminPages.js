import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "../../components/Layout/ErrorPage";
import AdminPrivateRoute from "../../components/Route/AdminPrivateRoute";
import Dashboard from "./Dashboard";

function AdminPages() {
  return (
    <Routes>
      <Route path="/" element={<AdminPrivateRoute isAdmin={true} />}>
        <Route path="" element={<Dashboard />} /> </Route>
        <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AdminPages;
