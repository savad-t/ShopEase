import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Contact from "./pages/Contact.jsx";
import Login from "./Pages/Login";
import Register from "./pages/Register";
import Categories from "./components/Categories";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import NewArrival from "./pages/NewArrival";

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<NewArrival />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
