import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";
import api from "../Api/Axios_Instance"; 
import { useNavigate } from "react-router-dom";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }

    const key = `cart_${user.email}`;
    try {
      const stored = localStorage.getItem(key);
      setCart(stored ? JSON.parse(stored) : []);
    } catch {
      setCart([]);
    }
  }, [user]);


  const saveCart = async (updatedCart) => {
    if (!user) return;
    localStorage.setItem(`cart_${user.email}`, JSON.stringify(updatedCart));
    try {
      await api.patch(`/users/${user.id}`, { cart: updatedCart });
    } catch (err) {
      console.error("Error syncing cart:", err);
    }
  };

  const addToCart = async (product, quantity = 1, silent = false) => {
    if (!user) return toast.error("Please login to add items 🛒");

    const existing = cart.find(p => p.id === product.id);
    let updatedCart;

    if (existing) {
      updatedCart = cart.map(p => 
        p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
      );
      if (!silent) toast(`${product.name} quantity updated 🛒`);
    } else {
      updatedCart = [...cart, { ...product, quantity }];
      if (!silent) toast.success(`${product.name} added to cart 🛒`);
    }

    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const removeFromCart = async (id) => {
    if (!cart.some(p => p.id === id)) return;

    const updatedCart = cart.filter(p => p.id !== id);
    setCart(updatedCart);
    toast.error("Removed from cart ❌");
    await saveCart(updatedCart);
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return; // optional: remove if zero
    const updatedCart = cart.map(p => 
      p.id === id ? { ...p, quantity } : p
    );
    setCart(updatedCart);
    await saveCart(updatedCart);
  };

  const clearCart = async () => {
    setCart([]);
    toast("Cart cleared");
    await saveCart([]);
  };

  // Buy all items: save to localStorage and navigate
  const buyAll = async () => {
    if (cart.length === 0) return toast.error("Cart is empty");
    localStorage.setItem("checkoutItems", JSON.stringify(cart));
    navigate("/checkout");
  };

  const getTotal = () => 
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        buyAll
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
