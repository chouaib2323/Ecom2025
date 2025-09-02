import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseQty, addToCart, clearCart } from "../store/cartSlice";

import Liked from "../assets/Liked.png";
import cart from "../assets/cart.png";
import profile from "../assets/profile.png";
import logo from "../assets/logo.png";
import burgermenu from "../assets/burgermenu.png";
import Vector from "../assets/Vector.png";
import { Bubbles } from "lucide-react";

function Navbar() {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
console.log(cartItems)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div  onMouseLeave={() => setProfileOpen(false)} className="flex justify-between p-5 bg-gray-100 items-center z-10 relative">
        {/* 🟩 Slide Sidebar (Burger Menu) */}
        <AnimatePresence>
          {burgerOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4 }}
              className="top-0 h-screen w-1/2 left-0 bg-gray-200 absolute z-20"
            >
              <div className="absolute right-2 top-4" onClick={() => setBurgerOpen(false)}>
                <img className="w-8 h-auto cursor-pointer" src={Vector} alt="close" />
              </div>
              <div className="space-y-5 grid place-items-center h-screen">
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
        <div className="flex items-center space-x-5 relative">
          <img className="w-10 h-auto" src={Liked} alt="liked" />

          {/* 🛒 Cart Icon with Badge */}
          <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
            <img className="w-10 h-auto" src={cart} alt="cart" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* 👤 Profile Hover Wrapper */}
          <div className="relative" onClick={() => setProfileOpen(true)}>
            <img className="w-10 h-auto cursor-pointer" src={profile} alt="profile" />
            {profileOpen && (
              <div
                onMouseLeave={() => setProfileOpen(false)}
                className="w-36 h-32 bg-gray-200 absolute right-0 font-semibold grid place-items-center top-12 rounded-md shadow-md z-10"
              >
                {token ? (
                  <>
                    <Link to="/profile">Profile</Link>
                    <button onClick={handleLogout} className="text-red-500">
                      Logout
                    </button>
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

      {/* 🟦 Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 h-screen w-80 bg-gray-300 shadow-lg z-30 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold text-lg">Shopping Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-black font-bold">X</button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center">Your cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-2">
                    <img src={`http://localhost:5000/uploads/${item.images[0]}`} alt={item.name} className="w-12 h-12 object-cover rounded" />
                    <div className="flex-1 px-2">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                      <p className="text-sm text-gray-500">size : {item.selectedSize&&item.selectedSize}</p>
                      <p className="text-sm text-gray-500">size : {item.selectedColor&&item.selectedColor}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <button
                          onClick={() => dispatch(decreaseQty(item.id))}
                          className="px-2 bg-gray-300 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => dispatch(addToCart(item))}
                          className="px-2 bg-gray-300 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t ">
              <div className="flex justify-between font-semibold mb-2 ">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Link
              to='/Checkout'
                onClick={() => {
                  alert("Proceeding to checkout...");
                  setCartOpen(false);
                }}
                className="mt-2  flex flex-1 justify-center  w-full bg-gray-500 text-white py-2 rounded "
              >
                Checkout
              </Link>
              <button
                onClick={() => dispatch(clearCart())}
                className="mt-2 w-full bg-gray-200 text-gray-700 py-2 rounded"
              >
                Clear Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
