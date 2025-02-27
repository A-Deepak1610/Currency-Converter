import React from "react";
import CurrencyConverter from "../pages/CurrencyConverter";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Login";
import AdminPage from "../pages/AdminPage";
import  Amount  from '../store/Store'; 
import ErrorPage from "../pages/ErrorPage";
export default function Applayout() {
  const {user,setUser,admin,setAdmin}=Amount();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/converter_user" element={user==true ? <CurrencyConverter /> : <Navigate to="/" />} />
        <Route path="/converter_admin"element={admin==true ? <AdminPage/> : <Navigate to="/" />}  />
        <Route path="*"element={<ErrorPage/>}  />
      </Routes>
    </div>
  );
}
