import React, { useEffect, useState } from "react";
import api from "../Api/Axios_Instance";
import { useAuth } from "../Context/AuthContext";
import { FaTrash } from "react-icons/fa";

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        const response = await api.get(`/users/${user.id}`);
        const userData = response.data;
        setOrders(userData.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <p className="text-lg">Please log in to view your orders.</p>
      </div>
    );
  }

  const handleDeleteOrder = async (orderId) => {
    try {
      const updatedOrders = orders.filter((o) => o.id !== orderId);

      await api.patch(`/users/${user.id}`, { orders: updatedOrders });
      setOrders(updatedOrders);
      saveUser({ ...user, orders: updatedOrders });

      Swal.fire("Deleted!", "Order has been removed.", "success");
    } catch (error) {
      console.error("Error deleting order:", error);
      Swal.fire("Error", "Could not delete order.", "error");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F7F7F7] py-12 px-6 mt-20">
        <h1 className="text-4xl font-extrabold text-center text-[#004030] mb-10">
          My Orders 📦
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <p>No orders yet! Go shop something 🛍️</p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-10">
            {orders.map((order, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all"
              >
                <button
                  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  <FaTrash />
                </button>
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                  <div>
                    <p className="font-semibold text-[#004030]">
                      Order ID: #{order.id || index + 1}
                    </p>
                    <p className="text-sm text-gray-500">
                      Placed on: {new Date(order.date).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xl font-semibold text-[#004030]">
                    Total: ${order.total.toFixed(2)}
                  </p>
                    <p className="text-sm font-semibold text-gray-700">
                          {order.status}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {order.cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border rounded-lg p-3 shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-semibold text-[#004030]">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gray-700">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-[#004030]">
                    Shipping Address:
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {order.shipping.name}, {order.shipping.address},{" "}
                    {order.shipping.city}, {order.shipping.state} -{" "}
                    {order.shipping.zip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
