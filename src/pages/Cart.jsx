// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import Swal from "sweetalert2";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const isLoggedIn = () => !!localStorage.getItem("user");

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const buyNow = (item) => {
    if (!isLoggedIn()) {
      alert("Please login to buy!");
      return;
    }
    alert(`Buying ${item.name} for $${item.price}`);
    removeFromCart(cartItems.indexOf(item));
  };

  const addToWishlist = (item) => {
    if (!isLoggedIn()) {
      alert("Please login to add to wishlist!");
      return;
    }
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.some((i) => i.id === item.id)) {
      wishlist.push(item);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      Swal.fire({
                icon: "tick",
                title: "Added to Wishlist",
                text: `${item.name} Added to Wishlist`,
              });
    } else {
      Swal.fire({
                icon: "tick",
                title: "",
                text: `${item.name} is already in Wishlist`,
              });
    }
  };

  const getTotal = () => cartItems.reduce((total, item) => total + item.price, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">🛒 Your Cart</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-3 relative hover:scale-105 transform transition duration-300"
          >
            {/* Wishlist Icon */}
            <FaHeart
              className="absolute top-2 right-2 text-gray-400 cursor-pointer hover:text-red-500 transition"
              onClick={() => addToWishlist(item)}
            />
            <div className="overflow-hidden rounded-lg h-40">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transform hover:scale-110 transition duration-300"
              />
            </div>
            <h2 className="text-sm font-semibold mt-2 truncate">{item.name}</h2>
            <p className="text-gray-700 text-sm">${item.price}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => buyNow(item)}
                className="flex-1 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded transition text-sm font-medium"
              >
                Buy Now
              </button>
              <button
                onClick={() => removeFromCart(index)}
                className="flex-1 py-1 text-white bg-red-600 hover:bg-red-700 rounded transition text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right text-lg font-bold">
        Total: ${getTotal()}
      </div>
    </div>
  );
};

export default Cart;
