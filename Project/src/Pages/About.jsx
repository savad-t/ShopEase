import React from "react";
import { FaShoePrints, FaShippingFast, FaShieldAlt, FaHeadset } from "react-icons/fa";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 text-gray-800">
      {/* Hero Section */}

      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          About <span className="text-purple-400">ShopEase</span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-purple-200">
          We are passionate about delivering <span className="font-bold text-white">premium shoes</span> 
          that combine style, comfort, and quality.  
          Our mission is to provide footwear that makes you feel confident every step you take.
        </p>
      </div>

      {/* Features Section */}

      <div className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white/80 backdrop-blur-sm border border-purple-200 shadow-lg p-8 rounded-2xl text-center hover:shadow-xl hover:border-purple-300 transition-all duration-300">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoePrints className="text-white text-3xl" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-gray-900">Premium Quality</h3>
          <p className="text-gray-600 leading-relaxed">
            Handcrafted shoes with the finest materials, designed for durability and comfort.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-purple-200 shadow-lg p-8 rounded-2xl text-center hover:shadow-xl hover:border-purple-300 transition-all duration-300">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShippingFast className="text-white text-3xl" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-gray-900">Fast Delivery</h3>
          <p className="text-gray-600 leading-relaxed">
            Get your shoes delivered quickly with our reliable and speedy shipping.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-purple-200 shadow-lg p-8 rounded-2xl text-center hover:shadow-xl hover:border-purple-300 transition-all duration-300">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShieldAlt className="text-white text-3xl" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-gray-900">Secure Payments</h3>
          <p className="text-gray-600 leading-relaxed">
            Shop with confidence with our safe and encrypted payment methods.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-purple-200 shadow-lg p-8 rounded-2xl text-center hover:shadow-xl hover:border-purple-300 transition-all duration-300">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeadset className="text-white text-3xl" />
          </div>
          <h3 className="text-xl font-bold mb-4 text-gray-900">24/7 Support</h3>
          <p className="text-gray-600 leading-relaxed">
            Our customer support team is here for you anytime, anywhere.
          </p>
        </div>
      </div>

      {/* Story Section */}
      
      <div className="bg-gradient-to-r from-slate-900/5 via-purple-900/5 to-slate-900/5 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-2xl shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Story</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              ShopEase started with a simple vision – to revolutionize the way people experience footwear.  
              We believe shoes are more than just accessories; they are a statement of style, 
              a promise of comfort, and a mark of quality.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Each pair is carefully designed to ensure elegance, premium craftsmanship, and durability.  
              From casual sneakers to formal wear, we bring you the best in class footwear that complements your lifestyle.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-4xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Mission</h2>
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 rounded-2xl shadow-lg">
          <p className="text-xl leading-relaxed">
            "To provide exceptional footwear that combines innovative design with unparalleled comfort, 
            making every step our customers take a confident and stylish one."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;