import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import api from "../Api/Axios_Instance";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../Context/CartContext";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const location = useLocation();

  const [page, setPage] = useState(1);
  const [limit] = useState(9); 

  useEffect(() => {
    
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) setActiveFilter(category);
  }, [location.search]);

  const categories = ["all", "casuals", "boots", "formals", "sports"];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeFilter === "all" ||
      (p.category && p.category.toLowerCase() === activeFilter.toLowerCase());
    const matchesSearch = p.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / limit);


  const currentProducts = filteredProducts.slice(
    (page - 1) * limit,
    page * limit
  );

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="min-h-screen bg-white py-8 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Our Collection
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Timeless footwear designed for modern living
          </p>
        </div>

        
        <div className="flex justify-center mb-10">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder="Search for shoes..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1); 
              }}
              className="w-full border border-gray-300 rounded-lg py-3 px-5 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm transition-all"
            />
            <FaSearch className="absolute left-3 top-3.5 text-gray-400 text-lg" />
          </div>
        </div>

       
        <div className="flex justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveFilter(category);
                setPage(1); 
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeFilter === category
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {currentProducts.map((product) => {
            const isInWishlist = wishlist.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg relative"
              >
                
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-200 z-10"
                >
                  {isInWishlist ? (
                    <FaHeart className="text-lg text-red-500" />
                  ) : (
                    <FaRegHeart className="text-lg text-gray-400 hover:text-gray-600" />
                  )}
                </button>

                
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square bg-gray-50 overflow-hidden rounded-t-lg relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </Link>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {product.category}
                  </p>
                  <span className="text-2xl font-light text-gray-900">
                    ₹{product.price}
                  </span>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 mt-3"
                  >
                    <FaShoppingCart className="text-sm" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        
        <div className="flex justify-center mt-12 space-x-2">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              page === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                page === num
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              page === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
