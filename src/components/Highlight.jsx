// HighlightedItems.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HighlightedItems = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5001/products") // your db.json products endpoint
      .then((res) => {
        // Take first 8 items as highlighted
        setItems(res.data.slice(0, 8));
      })
      .catch((err) => console.error("Error fetching highlighted items:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        🔥 Highlighted Items
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md hover:shadow-lg transition rounded-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-contain p-3 bg-gray-100 transition-transform transform hover:scale-105"
            />
            <div className="p-3 text-center">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500">{item.category}</p>
              <p className="text-sm font-bold text-gray-800 mt-1">${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/shop")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
        >
          Explore More
        </button>
      </div>
    </div>
  );
};

export default HighlightedItems;
