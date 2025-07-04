import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import MainLayout from '../pages/MainLayout'; // don't forget this import!

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
