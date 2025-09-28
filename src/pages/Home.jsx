// // Home.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Components/Navbar";


// const Home = () => {
//   const navigate = useNavigate();

//   return (
    // <div
    //   className="relative w-full h-screen bg-cover bg-center pt-6"
    //   style={{
    //     backgroundImage:
    //       "url('https://images.unsplash.com/photo-1600185361449-53c24d40f18d?auto=format&fit=crop&w=1950&q=80')",
    //   }}
    // >
    //   {/* Navbar */}
    //   <Navbar />

    //   {/* Overlay */}
    //   <div className="absolute inset-0 bg-black bg-opacity-40"></div>

    //   {/* Text & Button */}
    //   <div className="absolute left-10 top-1/3 text-white max-w-lg">
    //     <h1 className="text-4xl md:text-6xl font-bold mb-6">
    //       Your Premium is here for You
    //     </h1>
//         <button
//           onClick={() => navigate("/shop")}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
//         >
//           Shop Now
//         </button>
//          <button
//               onClick={() => navigate("/categories")}
//               className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
//             >
//               Explore Categories
//             </button>
//       </div>


//     </div>
    
     
//   );
// };

// export default Home;




import React from "react";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import Navbar from "../Components/Navbar";
import Highlight from "../components/Highlight";
import Shop from "./Shop";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
       <div
      className="relative w-full h-screen bg-cover bg-center pt-6"
      style={{
        backgroundImage:
          "url('https://www.newtonrunning.com/cdn/shop/files/NR-Fusion2-Web-Header.jpg?v=1713977324)')",
      }}
    >
      <Navbar />

      {/* Overlay */}
      <div className="absolute inset-0  bg-opacity-40"></div>

      <div className="absolute left-10 top-1/3 text-white max-w-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Crafted for the Bold, Designed for You
        </h1>
      
          <button
            onClick={() => navigate("/shop")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            Explore Our Craft
          </button>
        </div>
      </div>

      <Categories />
      <Highlight/>
    </div>
  );
};

export default Home;
