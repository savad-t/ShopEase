import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const updateState = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const user = JSON.parse(localStorage.getItem("user")) || null;

    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
    setIsLoggedIn(!!user);
  };

  useEffect(() => {
    updateState();
    window.addEventListener("storage", updateState);
    return () => window.removeEventListener("storage", updateState);
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setShowSearch(false);
    }
  };

  // Function to check if route is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md flex items-center justify-between fixed top-0 left-0 w-full h-20 z-50 px-6">
      {/* Brand */}
      <div
        className="text-2xl font-bold text-blue-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        ShopEase
      </div>

      {/* Center Links */}
      <ul className="hidden md:flex space-x-8 text-gray-700 font-medium text-lg">
        <li
          className={`cursor-pointer hover:text-blue-600 transition ${isActive("/") ? "border-b-2 border-blue-600" : ""}`}
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className={`cursor-pointer hover:text-blue-600 transition ${isActive("/shop") ? "border-b-2 border-blue-600" : ""}`}
          onClick={() => navigate("/shop")}
        >
          Shop
        </li>
        <li
          className={`cursor-pointer hover:text-blue-600 transition ${isActive("/about") ? "border-b-2 border-blue-600" : ""}`}
          onClick={() => navigate("/about")}
        >
          New Arrivals
        </li>
        <li
          className={`cursor-pointer hover:text-blue-600 transition ${isActive("/contact") ? "border-b-2 border-blue-600" : ""}`}
          onClick={() => navigate("/contact")}
        >
          Contact
        </li>
      </ul>

      {/* Right Icons */}
      <div className="flex items-center space-x-5 relative">
        {/* Search Button */}
        <div className="relative">
          {!showSearch ? (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 text-gray-700 hover:text-blue-600 transition text-2xl"
            >
              <FiSearch />
            </button>
          ) : (
            <form onSubmit={handleSearchSubmit} className="absolute right-0 top-full mt-2 flex bg-white border-b border-gray-300 shadow-sm rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 outline-none"
              />
              <button type="submit" className="px-4 bg-blue-600 text-white hover:bg-blue-700 transition">
                Go
              </button>
            </form>
          )}
        </div>

        {/* Wishlist */}
        <div className="relative cursor-pointer" onClick={() => navigate("/wishlist")}>
          <FaHeart className="text-gray-700 hover:text-red-600 text-xl transition" />
          {wishlistCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </div>

        {/* Cart */}
        <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
          <FaShoppingCart className="text-gray-700 hover:text-green-600 text-xl transition" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>

        {/* Login/Logout */}
        <button
          onClick={handleAuthClick}
          className={`px-6 py-2 font-semibold text-white transition shadow-md ${
            isLoggedIn
              ? "bg-red-600 hover:bg-red-700 rounded-full"
              : "bg-blue-600 hover:bg-blue-700 rounded-full"
          }`}
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
