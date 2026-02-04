import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-0 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* description */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-purple-400 cursor-pointer">
            ShopEase
          </h2>
          <p className="text-purple-200 leading-relaxed">
            ShopEase offers premium shoes with unmatched quality and comfort. 
            Discover your perfect style and elevate your footwear collection with our exclusive designs.
          </p>
        </div>

        {/* links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-400">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {['Home', 'Shop', 'New Arrivals', 'About'].map((item) => (
              <li key={item}>
                <a
                  className="text-purple-200 hover:text-white transition-colors duration-200 cursor-pointer block py-1"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-400">
            Stay Updated
          </h3>
          <p className="text-purple-200 mb-4">
            Subscribe to our newsletter for latest offers and styles.
          </p>
          <div className="flex mb-6">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-3 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white-900"
            />
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-6 py-3 rounded-r-xl font-semibold transition-all duration-200"
            >
              Subscribe
            </button>
          </div>
          <div className="flex gap-4">
            {[
              { Icon: FaFacebookF, color: 'hover:text-blue-400' },
              { Icon: FaInstagram, color: 'hover:text-pink-400' },
              { Icon: FaLinkedinIn, color: 'hover:text-blue-500' }
            ].map(({ Icon, color }, index) => (
              <Icon
                key={index}
                className={`cursor-pointer text-purple-300 ${color} transition-colors duration-200 text-xl`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Bottom  */}
      <div className="bg-slate-900 text-center py-6 border-t border-purple-800/50">
        <p className="text-purple-300">
          &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
        </p>
        <p className="text-purple-400 text-sm mt-2">
          Your trusted shopping companion for premium footwear
        </p>
      </div>
    </footer>
  );
};

export default Footer;