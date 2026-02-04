import React, { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await api.get("/products");
        const products = response.data || [];

        const firstEight = products.slice(0, 8);
        setNewArrivals(firstEight);
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-16 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            New Arrivals
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our latest premium footwear collection
          </p>
          <div className="w-24 h-1 bg-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {newArrivals.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">
              No new arrivals available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer border border-gray-200"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                
                <div className="relative h-64 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  

                  <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    NEW
                  </div>
                </div>

                
                <div className="p-6">
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {product.name}
                    </h2>
                    <p className="text-sm text-purple-600 font-medium capitalize">
                      {product.category}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <FaEye className="text-lg" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        
        {newArrivals.length > 0 && (
          <div className="text-center mt-16">
            <button
              onClick={() => navigate("/shop")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewArrivals;