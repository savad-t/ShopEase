import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { BarChart3, LogOut, Package, ShoppingCart, Users } from "lucide-react";

const SideBar = () => {
  const toNavigate = [
    { name: "Dash Board", path: "/dashboard", icon: BarChart3 },
    { name: "Users", path: "/users", icon: Users },
    { name: "Products", path: "/products", icon: Package },
    { name: "Orders", path: "/orders", icon: ShoppingCart },
  ];
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-60 h-screen bg-white shadow-lg fixed flex flex-col">
      {/* Header */}
      <div className="px-4 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Admin Panel
        </h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 mt-4 px-4">
        <div className="space-y-2">
          {toNavigate.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
