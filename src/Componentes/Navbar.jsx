import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Liked from '../assets/Liked.png';
import cart from '../assets/cart.png';
import profile from '../assets/profile.png';
import logo from '../assets/logo.png';
import burgermenu from '../assets/burgermenu.png';
import Vector from '../assets/Vector.png';

function Navbar() {
  const [burgerOpen, setBurgerOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between p-5 bg-gray-100 items-center  z-10">

        {/* 🟩 Slide Sidebar */}
        <AnimatePresence>
          {burgerOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.4 }}
              className="top-0 h-full w-1/2 left-0    bg-gray-300 absolute  z-20 "
            >
              <div className='   absolute right-2 top-4 ' onClick={() => setBurgerOpen(false)}>
                <img className="w-8 h-auto  cursor-pointer" src={Vector} />
              </div>
              <div className=' space-y-5 grid place-items-center   h-full '>
                <div className=' grid  space-y-5'>
              <Link className="font-serif" to="/">Home</Link>
              <Link className="font-serif" to="/Products">Products</Link>
              <Link className="font-serif" to="/New">New</Link>
              </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🟦 Burger Menu */}
        <div className="flex items-center space-x-5">
          <div onClick={() => setBurgerOpen(!burgerOpen)}>
            <img className="w-6 h-auto cursor-pointer" src={burgermenu} />
          </div>
          <div className="md:flex space-x-5 hidden">
            <Link className="font-serif" to="/">Home</Link>
            <Link className="font-serif" to="/Products">Products</Link>
            <Link className="font-serif" to="/New">New</Link>
          </div>
        </div>

        {/* 🟥 Logo */}
        <div>
          <img className="w-6 h-auto" src={logo} />
        </div>

        {/* 🟨 Shopping, Liked, Profile */}
        <div className="flex items-center space-x-5">
          <div>
            <img className="w-10 h-auto" src={Liked} />
          </div>
          <div>
            <img className="w-10 h-auto" src={cart} />
          </div>
          <div>
            <img className="w-10 h-auto" src={profile} />
          </div>
        </div>

      </div>
    </>
  );
}

export default Navbar;
