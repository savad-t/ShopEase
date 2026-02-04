import React from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaBoxOpen, FaUser } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemsCount = wishlist.length;

  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-200 w-full p-4 flex items-center justify-between fixed top-0 left-0 z-50">
      
      <div
        className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent cursor-pointer"
        onClick={() => navigate("/")}
      >
        ShopEase
      </div>

      
      <ul className="hidden md:flex space-x-8 font-medium">
        {[
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
          { name: "New Arrivals", path: "/newarrivals" },
          { name: "About", path: "/about" }
        ].map((item) => (
          <li
            key={item.name}
            className="text-gray-700 hover:text-purple-600 transition-colors duration-200 cursor-pointer py-2 px-1 relative group"
            onClick={() => navigate(item.path)}
          >
            {item.name}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
          </li>
        ))}
      </ul>

      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div
            className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-xl cursor-pointer p-2 rounded-lg hover:bg-purple-50"
            onClick={() => navigate("/wishlist")}
          >
            <FaHeart />
          </div>
          {wishlistItemsCount > 0 && (
            <span className="absolute -top-0 -right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {wishlistItemsCount}
            </span>
          )}
        </div>

        
        <div className="relative">
          <div
            className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-xl cursor-pointer p-2 rounded-lg hover:bg-purple-50"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart />
          </div>
          {cartItemsCount > 0 && (
            <span className="absolute -top-0 -right-0 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              {cartItemsCount}
            </span>
          )}
        </div>

        
        <div
          className="text-gray-600 hover:text-purple-600 transition-colors duration-200 text-xl cursor-pointer p-2 rounded-lg hover:bg-purple-50 hidden sm:block"
          onClick={() => navigate("/order-history")}
        >
          <FaBoxOpen />
        </div>

        
        {user ? (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-gray-700">
              <FaUser className="text-purple-600" />
              <span className="text-sm font-medium hidden sm:block">
                {user.name.toUpperCase()}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-sm"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;