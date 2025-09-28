// src/components/Categories.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Casual",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/abbc2d6e-05e7-4c9c-9060-3bbd090a1136/NIKE+ZOOM+VOMERO+5+SE.png",
  },
  {
    name: "Formal",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9e0c69fc-89df-474a-b5e5-e68126cbb94e/NIKE+COURT+ROYALE+2+NN.png",
  },
  {
    name: "Sports",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/21f56016-2e59-4392-b80f-c9440573f798/ZOOMX+VAPORFLY+NEXT%25+4.png",
  },
  {
    name: "Boots",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/23b5da9d-f372-4671-94bc-1901dafd4055/NIKE+SFB+B2+L.png",
  },
  // {
  //   name: "Boots",
  //   image:
  //     "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/23b5da9d-f372-4671-94bc-1901dafd4055/NIKE+SFB+B2+L.png",
  // },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
  };

  return (
    <div className="py-20 px-8 bg-gray-50">
      <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800 tracking-wide">
        CHOOSE YOUR STYLE
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-7xl mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(cat.name)}
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-xl"
          >
            {/* Image */}
            <div className="overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-contain p-4 bg-gray-100 transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Info */}
            <div className="p-4 text-center">
              <h3 className="text-base font-semibold text-gray-700 mb-3">
                {cat.name}
              </h3>
              <button
                onClick={() => handleCategoryClick(cat.name)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-sm rounded-full transition duration-300"
              >
                View Products
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Categories;
