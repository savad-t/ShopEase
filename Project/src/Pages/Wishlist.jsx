import React from "react";
import { useWishlist } from "../Context/WishlistContext.jsx";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist();

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-6 px-8 mt-20">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-[#004030] tracking-wide">
        My Wishlist ❤️
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative border border-[#004030] hover:shadow-xl transition-transform duration-300 transform hover:scale-105 flex flex-col justify-between"
              style={{ height: "500px" }}
            >
              <Link to={`/product/${product.id}`}>
              <div className="overflow-hidden h-64">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover p-4"
                />
              </div>
              </Link>

              <FaTrash
                className="absolute top-2 right-2 text-xl cursor-pointer text-red-600 hover:text-red-800"
                onClick={() => removeFromWishlist(product.id)}
              />

              
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h2 className="text-lg font-semibold text-[#004030]">{product.name}</h2>
                  <p className="text-sm text-[#004030]">{product.category}</p>
                  <p className="font-bold mt-2 text-[#004030]">₹{product.price.toFixed(2)}</p>
                </div>

                <button
                  className="mt-4 w-full py-2 rounded-lg text-white font-semibold transition hover:bg-blue-700"
                  style={{ backgroundColor: "#119DB6" }}
                  onClick={() => moveToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
