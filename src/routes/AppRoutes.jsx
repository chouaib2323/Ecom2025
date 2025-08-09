import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../pages/MainLayout'; 
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Products from '../pages/Products';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import ProductForm from '../pages/ProductForm';
import AddCatigory from '../pages/AddCatigory';
import AdminLayout from '../pages/AdminLayout';


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Products" element={<Products />} />
      </Route>
      <Route path="/AdminLogin" element={<AdminLogin/>} />
      

      <Route element={<AdminLayout />}>
      <Route path="/AdminDashboard" element={<AdminDashboard/>} />
      <Route path="/ProductForm" element={<ProductForm/>} />
      <Route path="/AddCatigory" element={<AddCatigory/>} />
      </Route>

    </Routes>
  );
}
