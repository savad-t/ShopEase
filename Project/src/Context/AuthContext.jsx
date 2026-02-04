import { createContext, useContext, useState, useEffect } from "react";
import api from "../Api/Axios_Instance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // updating user array
  const saveUser = (updatedUser) => {
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex((u) => u.email === updatedUser.email);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
    }
    setUser(updatedUser);
  };

  // Signup
  const signup = async ({ name, email, password }) => {
    try {
      const response = await api.get(`/users?email=${email}`);
      if (response.data.length > 0) {
        toast.error("Email id already exists");
        return false;
      } else {
        const newUser = { name, email, password };
        const userData = {
          ...newUser,
          cart: [],
          wishlist: [],
          orders: [],
          role :"user",
          isLoggedin:true,
          isBlock:false
        };

        const postResponse = await api.post("/users", userData);

        localStorage.setItem("currentUser", JSON.stringify(postResponse.data));
        setUser(postResponse.data);
        toast.success("Signup successful");
        return postResponse.data;
      }
    } catch (e) {
      console.log("signup error", e);
      toast.error("Signup failed. Please try again.");
      return false;
    }
  };

  // Login
  const login = async (email, password) => {
    try {
      const response = await api.get(
        `/users?email=${email}&&password=${password}`
      );

      if (response.data.length === 0) {
        toast.error("The Username or Password doesn't match");
        return false;
      }
      const userData = response.data[0];

      if (userData.isBlock){
        toast.error("You are Blocked!, Please contact us!");
        return false;
      }

      localStorage.setItem("currentUser", JSON.stringify(userData));
      setUser(userData);

      // toast.success("Logged in successfully");      
      return userData;

    } catch (e) {
      console.log(e);
      toast.error("Login failed. Please try again.");
      return false;
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  // BuyNow
  const BuyNow = (product, quantity = 1) => {
    if (user) {
      localStorage.setItem("buyNowItem",JSON.stringify({ ...product, quantity })
      );
      navigate("/checkout");
    } else {
      toast.error("Please login to buy items");
      navigate("/login");
    }
  };

  
  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loading, BuyNow }}
    >
      {children}
    </AuthContext.Provider>
  );
};
