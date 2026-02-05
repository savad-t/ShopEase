// src/pages/Wishlist.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (index) => {
    const updated = [...wishlist];
    updated.splice(index, 1);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Your wishlist is empty.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">❤️ Your Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {wishlist.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 relative"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-700 mb-4">${item.price}</p>
            <button
              onClick={() => removeFromWishlist(index)}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
