import React, { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await api.get("/products");
        const products = response.data;

        const mainCategories = ["Formals", "Casuals", "Boots", "Sports"];
        const filtered = mainCategories
          .map((cat) => {
            return products.find(
              (item) =>
                item.category &&
                item.category.toLowerCase() === cat.toLowerCase()
            );
          })
          .filter(Boolean);

        setCategories(filtered);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="py-20 px-4 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="text-center mt-10 mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections for every occasion
          </p>
          <div className="w-24 h-1 bg-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/*  Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer border border-gray-200"
              onClick={() => navigate(`/shop?category=${cat.category}`)}
            >
              
              <div className="relative h-48 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.category}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {cat.category}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore the best {cat.category.toLowerCase()} shoes
                </p>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center justify-center gap-2 group/btn">
                  Shop Now
                  <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          ))}
        </div>

        
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/shop")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
          >
            View All Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;