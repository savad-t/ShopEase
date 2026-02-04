import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaBuyNLarge,
  FaArrowLeft,
} from "react-icons/fa";
import api from "../Api/Axios_Instance";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams(); // ✅ Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { wishlist, toggleWishlist } = useWishlist();
  const { cart, addToCart, updateQuantity } = useCart();
  const { BuyNow } = useAuth();

  const isInWishlist = wishlist.some((item) => item.id === parseInt(id));


  const cartItem = cart.find((item) => item.id === product?.id);
  const quantity = cartItem?.quantity || 1;


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to load product details");
      }
    };
    fetchProduct();
  }, [id]);

  const handleDecrease = () => {
    if (!cartItem) {
      addToCart(product, 1, true);
    } else {
      updateQuantity(product.id, quantity - 1);    }
  };

  const handleIncrease = () => {
    if (!cartItem) {
      addToCart(product, 1, true);
    } else {
      updateQuantity(product.id, quantity + 1);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden p-8 grid grid-cols-1 lg:grid-cols-2 gap-10 border border-gray-200">
        
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md h-auto object-contain rounded-xl shadow-sm"
          />
        </div>

        
        <div className="flex flex-col justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-500 mb-4 hover:text-[#004030] transition"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>

          <h2 className="text-4xl font-extrabold text-[#004030] mb-3">
            {product.name}
          </h2>
          <p className="text-gray-600 text-lg mb-3 capitalize">
            Category: <span className="font-medium">{product.category}</span>
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description ||
              "Step into comfort and confidence with this premium footwear. Designed to keep you stylish and comfortable all day."}
          </p>

          <div className="text-3xl font-bold text-[#004030] mb-8">
            ₹{product.price.toFixed(2)}
          </div>

          
          <div className="flex items-center gap-4">
            <button
              onClick={() => addToCart(product, 1)}
              className="flex-1 bg-[#119DB6] hover:bg-[#0e879c] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button
              onClick={() => BuyNow(product, 1)}
              className="flex-1 bg-[#119DB6] hover:bg-[#0e879c] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <FaBuyNLarge /> Buy Now
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className={`flex items-center justify-center w-14 h-14 rounded-full border transition-all duration-200 ${
                isInWishlist
                  ? "bg-red-500 text-white border-red-500"
                  : "border-gray-300 hover:bg-gray-100 text-gray-600"
              }`}
            >
              {isInWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <div>
            <div className="mt-6 flex items-center">
              <button
                onClick={handleDecrease}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="px-4 text-lg font-semibold">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
