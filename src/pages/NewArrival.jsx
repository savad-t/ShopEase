import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

const NewArrival = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/products?_limit=6")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-red-400  tracking-wider">
        New 
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 hover:shadow-2xl transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover rounded-t-3xl"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-yellow-300 font-semibold text-lg">${product.price}</p>
                <button className="mt-4 w-full py-2 rounded-full bg-gradient-to-r from-navyblue-400 to-gray-500 text-black font-bold hover:scale-105 transition transform shadow-md">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
