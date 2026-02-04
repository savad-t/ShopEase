import React, { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../Api/Axios_Instance";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Checkout = () => {
  const { cart, clearCart, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [buyNowItem, setBuyNowItem] = useState(null);

  
  useEffect(() => {
    const storedBuyNow = localStorage.getItem("buyNowItem");
    const storedCheckoutItems = localStorage.getItem("checkoutItems");

    if (storedBuyNow) {
      setBuyNowItem(JSON.parse(storedBuyNow));
    } else if (storedCheckoutItems) {
      const items = JSON.parse(storedCheckoutItems);
      setBuyNowItem({ multiple: true, items });
    }
  }, []);

  const itemsToBuy = buyNowItem
    ? buyNowItem.multiple
      ? buyNowItem.items
      : [buyNowItem]
    : cart;

  const [shipping, setShipping] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  });

  const total = itemsToBuy.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      Swal.fire("Login Required", "Please log in to place an order.", "warning");
      return;
    }

    if (!shipping.name || !shipping.address || !shipping.city) {
      toast.error("Incomplete shipping info!");
      return;
    }

    try {
      const response = await api.get(`/users/${user.id}`);
      const userData = response.data;

      const newOrder = {
        id: Date.now(),
        status:"pending",
        date: new Date().toISOString(),
        total,
        cart: itemsToBuy,
        shipping,
        
      };

      const updatedOrders = userData.orders ? [...userData.orders, newOrder] : [newOrder];
      await api.patch(`/users/${user.id}`, { orders: updatedOrders });

      
      if (buyNowItem) {
        if (buyNowItem.multiple) {
          await clearCart();
          localStorage.removeItem("checkoutItems");
        } else {
          await removeFromCart(buyNowItem.id);
          localStorage.removeItem("buyNowItem");
        }
      } else {
        await clearCart();
      }

      Swal.fire("Order Placed!", "Your order has been placed successfully.", "success");
      navigate("/order-history");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to place order.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] py-12 px-6 mt-20">
      <h1 className="text-4xl font-extrabold text-center text-[#004030] mb-10">Checkout 🧾</h1>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-2xl font-semibold mb-6 text-[#004030]">Shipping Info</h2>
          <div className="space-y-4">
            {["name","address","city","state","pin"].map(field => (
              <input
                key={field}
                type="text"
                name={field}
                value={shipping[field]}
                onChange={handleInputChange}
                placeholder={`Enter ${field}`}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#004030]"
              />
            ))}
          </div>
        </div>

        
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-2xl font-semibold mb-6 text-[#004030]">Order Summary</h2>

          {itemsToBuy.length === 0 ? (
            <p className="text-gray-600 text-center mt-10">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-3">
                {itemsToBuy.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b py-2">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border shadow-sm"/>
                    <p>{item.name}</p>
                    <p>₹{item.price} x {item.quantity}</p>
                    <p>₹{(item.price*item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-between text-lg font-semibold mt-6">
                <p>Total:</p>
                <p>₹{total.toFixed(2)}</p>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-[#004030] text-white py-3 rounded-lg mt-6 hover:bg-[#006040] transition-all"
              >
                Place Order
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
