import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {Search,Filter,Eye,ChevronDown,Calendar,User,Package,IndianRupee,} from "lucide-react";
import SideBar from "../components/SideBar";
import api from "../Api/Axios_Instance";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch all user orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: users } = await api.get("/users");
        const customerUsers = users.filter(
          (u) => u.role?.toLowerCase() !== "admin"
        );

        const allOrders = customerUsers.flatMap((user) =>
          (user.orders || []).map((order) => ({
            ...order,
            customer: user.name,
            customerEmail: user.email,
            date: new Date(order.date),
            formattedDate: new Date(order.orderDate).toLocaleDateString(),
            status: order.status || "Pending",
          }))
        );

        setOrders(allOrders.sort((a, b) => b.date - a.date));
        setFilteredOrders(allOrders);
      } catch {
        toast.error("Failed to load orders!");
      } finally {
        setTimeout(() => setLoading(false), 1500);
      }
    };
    fetchOrders();
  }, []);

  // Filter orders by search & status
  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter((o) =>
        [o.customer, o.customerEmail, o.id]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (o) => o.status.toLowerCase() === statusFilter
      );
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, orders]);

  // Update status  
  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    toast.success(`Order marked as ${newStatus}`);

    try {
      const { data: users } = await api.get("/users");
      const user = users.find((u) => u.orders?.some((o) => o.id === orderId));
      if (user) {
        const updatedOrders = user.orders.map((o) =>
          o.id === orderId ? { ...o, status: newStatus } : o
        );
        await api.patch(`/users/${user.id}`, { orders: updatedOrders });
      }
    } catch {
      toast.error("Failed to update order in database!");
    }
  };

  // Status color 
  const getStatusColor = (status) =>
    ({
      completed: "bg-green-50 text-green-700 border-green-200",
      success: "bg-green-50 text-green-700 border-green-200",
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      processing: "bg-blue-50 text-blue-700 border-blue-200",
      shipped: "bg-purple-50 text-purple-700 border-purple-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
      failed: "bg-red-50 text-red-700 border-red-200",
    }[status.toLowerCase()] || "bg-gray-50 text-gray-700 border-gray-200");

  if (loading)
    return (
      <div className="flex min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 ml-60 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading orders...</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 ml-60 flex flex-col">
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Order Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage and track all customer orders
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {orders.length}
                  </p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Package className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {
                      orders.filter((o) => o.status.toLowerCase() === "pending")
                        .length
                    }
                  </p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {
                      orders.filter(
                        (o) => o.status.toLowerCase() === "completed"
                      ).length
                    }
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <User className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ₹
                    {orders
                      .reduce(
                        (sum, order) => sum + parseFloat(order.total || 0),
                        0
                      )
                      .toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <IndianRupee className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by order ID, customer name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              <div className="flex items-center space-x-3">
                <Filter className="h-5 w-5 text-gray-400" />
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  Customer Orders
                </h3>
                <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                  {filteredOrders.length} orders found
                </span>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">
                  No orders found
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "No orders have been placed yet"}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Order ID",
                        "Customer",
                        "Date",
                        "Amount",
                        "Status",
                        "Actions",
                      ].map((head) => (
                        <th
                          key={head}
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            #{order.id}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">
                              {order.customer}
                            </span>
                            <span className="text-xs text-gray-500 mt-1">
                              {order.customerEmail}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {order.formattedDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">
                            ₹{order.total.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(order.id, e.target.value)
                            }
                            className={`text-xs font-medium rounded-lg px-3 py-2 border transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-opacity-50 ${getStatusColor(
                              order.status
                            )}`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-200"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Order Details Modal */}
          {selectedOrder && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedOrder(null)}
            >
              <div
                className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Order #{selectedOrder.id}
                  </h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedOrder.customer}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedOrder.customerEmail}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Order Date
                      </p>
                      <p className="text-xs text-gray-500">
                         {new Date(selectedOrder.date).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Status
                      </p>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(
                          selectedOrder.status
                        )}`}
                      >
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Order Items
                    </h4>
                    {selectedOrder.cart?.length ? (
                      <div className="space-y-2">
                        {selectedOrder.cart.map((item, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              ₹{item.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm text-center py-4">
                        No items found
                      </p>
                    )}
                  </div>

                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total Amount:
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      ₹{selectedOrder.total}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Orders;
