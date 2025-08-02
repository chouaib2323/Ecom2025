import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';

import Liked from '../assets/Liked.png';
import cart from '../assets/cart.png';
import profile from '../assets/profile.png';
import logo from '../assets/logo.png';
import burgermenu from '../assets/burgermenu.png';
import Vector from '../assets/Vector.png';

function Navbar() {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          localStorage.removeItem('token');
        } 
      } catch (err) {
        console.error('Invalid token:', err);
        localStorage.removeItem('token');
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <div className="flex justify-between p-5 bg-gray-100 items-center z-10 relative">

        {/* 🟩 Slide Sidebar */}
        <AnimatePresence>
          {burgerOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4 }}
              className="top-0 h-full w-1/2 left-0 bg-gray-200 absolute z-20"
            >
              <div className="absolute right-2 top-4" onClick={() => setBurgerOpen(false)}>
                <img className="w-8 h-auto cursor-pointer" src={Vector} alt="close" />
              </div>
              <div className="space-y-5 grid place-items-center h-full">
                <div className="grid space-y-5 font-semibold text-gray-500">
                  <Link className="font-serif" to="/">Home</Link>
                  <Link className="font-serif" to="/Products">Products</Link>
                  <Link className="font-serif" to="/New">New</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🍔 Burger Menu */}
        <div className="flex items-center space-x-8">
          <div onClick={() => setBurgerOpen(!burgerOpen)}>
            <img className="w-6 md:hidden h-auto cursor-pointer" src={burgermenu} alt="menu" />
          </div>
          <div className="md:flex space-x-5 hidden font-semibold text-gray-500">
            <Link className="font-serif" to="/">Home</Link>
            <Link className="font-serif" to="/Products">Products</Link>
            <Link className="font-serif" to="/New">New</Link>
          </div>
        </div>

        {/* Logo */}
        <div>
          <img className="w-7 h-auto" src={logo} alt="logo" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <img className="w-10 h-auto" src={Liked} alt="liked" />
          <img className="w-10 h-auto" src={cart} alt="cart" />

          {/* 👤 Profile Hover Wrapper */}
          <div
            className="relative"
            onMouseEnter={() => setProfileOpen(true)}
            
          >
            <img
              className="w-10 h-auto cursor-pointer"
              src={profile}
              alt="profile"
            />

            {/* 🟫 Dropdown Menu */}
            {profileOpen && (
              <div onMouseLeave={() => setProfileOpen(false)} className="w-36 h-32 bg-gray-200 absolute right-0 font-semibold grid place-items-center top-12 rounded-md shadow-md z-10">
                {token ? (
                  <>
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout} className="text-red-500">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
