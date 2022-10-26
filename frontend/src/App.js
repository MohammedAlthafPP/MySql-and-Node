import React, { useEffect } from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import UserPages from "./pages/userPages"
import Header from "./components/Layout/Header";
import HomePage from "./pages/HomePage";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import store from "./Redux/store";
import { loadUser } from "./Redux/actions/userAction";
import AdminPages from "./pages/admin/AdminPages";
import ErrorPage from "./components/Layout/ErrorPage";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
}, []);

  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/user/*" element={<UserPages />} />
      <Route path="/admin/*" element={<AdminPages />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
