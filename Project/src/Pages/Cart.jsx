import React from "react";
import { useCart } from "../Context/CartContext.jsx";
import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";



const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal, buyAll } =useCart();


  if (cart.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center mt-5 px-4">
        <h2 className="text-4xl font-bold text-[#004030] mb-4">Your Cart 🛒</h2>
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
        </div>
    );

 
  return (
    <div className="min-h-screen py-6 px-8 mt-20">
      <h2 className="text-4xl font-bold text-[#004030] mb-8 text-center">
        My Cart 🛒
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {cart.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden relative border border-[#004030] hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
            style={{ height: "450px" }}
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

            {/* delete button */}

            <FaTrash
              className="absolute top-2 right-2 text-xl cursor-pointer text-red-600 hover:text-red-800"
              onClick={() => removeFromCart(product.id)}
            />

            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-[#004030]">
                {product.name}
              </h2>
              <p className="text-sm text-[#004030]">{product.category}</p>
              <p className="font-bold mt-2 text-[#004030]">₹{product.price.toFixed(2)}</p>

              {/* quantity controls */}
              <div className="flex items-center justify-center mt-4 space-x-2">
                <button
                  onClick={() =>
                    updateQuantity(product.id, product.quantity - 1)
                  }
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="px-3">{product.quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity(product.id, product.quantity + 1)
                  }
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
                >
                  +
                </button>
                <div>
                  {product.quantity == 1 ? null : (product.quantity*product.price).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      
      <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-2xl font-bold text-[#004030]">
          Total: ₹{getTotal().toFixed(2)}
        </h3>

        
        <div className="flex items-center gap-3">
          <button
            onClick={buyAll}
            className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-900 transition"
            
          >
            Buy All
          </button>
          <button
            onClick={clearCart}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
