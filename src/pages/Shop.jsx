import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Swal from "sweetalert2";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5001/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const isLoggedIn = () => !!localStorage.getItem("user");

  const addToCart = (product) => {
    if (!isLoggedIn()) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.some(item => item.id === product.id)) {
    Swal.fire({
              icon: "",
              title: "Already in Cart",
              text: `${product.name} is already in your cart`,
            });
    return;
  }

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire({
              icon: "success",
              title: "Added to Cart",
              text: `${product.name} Added to Cart`,
            });
  };

  const addToWishlist = (product) => {
    if (!isLoggedIn()) {
      alert("Please login first!");
      navigate("/login");
      return;
    }
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (!wishlist.some(item => item.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} is already in wishlist!`);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    
    <div className="min-h-screen bg-gray-50 py-6 px-8 mt-20">
      <Navbar/>
      <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800 tracking-wide">
        Explore Yours..
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <img src={product.image} alt={product.name} className="w-full h-40 object-contain p-3 bg-gray-100" />
            <FaHeart
              className="absolute top-2 right-2 text-blue-500 text-xl cursor-pointer"
              onClick={() => addToWishlist(product)}
            />
            <div className="p-3 text-center">
              <h2 className="text-sm font-semibold">{product.name}</h2>
              <p className="text-xs text-gray-500">{product.category}</p>
              <p className="font-bold mt-1">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
