import React from "react";
import bg from "../assets/bg.png";
import { useNavigate } from "react-router-dom";
import Categories from "./Category";
import NewArrivals from "./NewArrivals";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      
      <section
        id="hero"
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 pt-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] leading-tight">
            Step Into <span className="text-purple-300">Premium</span> Style
          </h1>
          <h3 className="text-xl md:text-2xl font-light mb-8 text-gray-200 drop-shadow-[0_3px_8px_rgba(0,0,0,0.8)] max-w-2xl leading-relaxed">
            Where every step reflects elegance and exceptional craftsmanship
          </h3>
          <button
            onClick={() => navigate("/shop")}
            className="px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            style={{ 
              backgroundColor: "#8B5CF6", 
              color: "white" 
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#7C3AED")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#8B5CF6")
            }
          >
            EXPLORE COLLECTION
          </button>
        </div>
      </section>

      {/* categories */}
      <Categories/>

      {/* new arrivals */}
      <NewArrivals/>

    </div>
  );
}

export default Home;