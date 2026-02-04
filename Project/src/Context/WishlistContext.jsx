import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext.jsx";
import toast from "react-hot-toast";
import api from "../Api/Axios_Instance.jsx";
import { useCart } from "./CartContext.jsx";

const WishlistContext = createContext();
export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const { addToCart } = useCart(); 
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

 
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setWishlist([]);
        setOrders([]);
        return;
      }
      try {
        const userRes = await api.get(`/users/${user.id}`);
        const userData = userRes.data;
        setWishlist(userData.wishlist || []);
        setOrders(userData.orders || []);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        toast.error("Failed to load your data from the server");
        setWishlist([]);
        setOrders([]);
      }
    };
    fetchUserData();
  }, [user]);

  // Add to Wishlist
  const addToWishlist = async (product) => {
    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    if (wishlist.find((item) => item.id === product.id)) {
      toast("Already in wishlist", { icon: "⚠️" });
      return;
    }

    const updatedWishlist = [...wishlist, product];
    setWishlist(updatedWishlist);
    toast.success(`${product.name} added to wishlist`);

    try {
      await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist on server");
    }
  };

  // Remove from Wishlist
  const removeFromWishlist = async (id, silent=false) => {
    if (!user) return;

    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    if(!silent) toast("Removed from wishlist");

    try {
      await api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
    } catch (error) {
      console.error("Error updating wishlist:", error);
      if(!silent) toast.error("Failed to update wishlist on server");
    }
  };

  // Toggle Wishlist
  const toggleWishlist = (product) => {
    if (wishlist.find((p) => p.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

const moveToCart = (product) => {
  if (!user) {
    toast.error("Please login to move items to cart");
    return;
  }

  if (addToCart) {
    addToCart(product, 1, true);
    removeFromWishlist(product.id, true);
    toast.success(`${product.name} moved to cart!`);
  }
};


  // order
  const addOrder = async (order) => {
    if (!user) return;

    try {
      const updatedOrders = [...orders, order];
      setOrders(updatedOrders);
      await api.patch(`/users/${user.id}`, { orders: updatedOrders });
      toast.success("Order saved to profile!");
    } catch (error) {
      console.error("Failed to add order to user profile:", error);
      toast.error("Failed to save order to profile");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        orders,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        moveToCart,
        addOrder,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
