import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import api from "../Api/Axios_Instance";
import {BarChart3,Eye,Package,ShoppingCart,TrendingUp,Users,} from "lucide-react";
import Fakeeee from "./Fakeeee";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [orders, setOrders] = useState([]);
  const [fullOrder, setFullOrder] = useState([]);
  const [peoples, setPeoples] = useState(0);
  const [products, setProducts] = useState(0);
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await api.get("/users");
        const users = usersRes.data.filter(
          (user) => user.role.toLowerCase() !== "admin"
        );
        setPeoples(users.length);

        const allOrders = users.flatMap((user) =>
          (user.orders || []).map((order) => ({
            id: order.id,
            customer: user.name,
            date: new Date(order.orederDate).toLocaleDateString(),
            amount: order.total,
            status: order.status,
          }))
        );
        const ordersno = allOrders;
        setFullOrder(ordersno);

        const recentOrders = allOrders
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);

        setOrders(recentOrders);

        const productRes = await api.get("/products");
        setProducts(productRes.data.length);
      } catch (err) {
        console.log("error fetching datas", err);
      }
    };
    fetchData();
  }, []);

  const totalRevenue = fullOrder.reduce(
    (sum, order) => sum + parseFloat(order.amount || 0),
    0
  );

  const states = [
    {
      title: "Total Users",
      value: peoples,
      icon: Users,
      gradient: "from-purple-500 to-pink-500",
      trend: "12%",
      description: "Active customers",
    },
    {
      title: "Total Orders",
      value: fullOrder.length,
      icon: ShoppingCart,
      gradient: "from-blue-500 to-cyan-500",
      trend: "+8.5%",
      description: "This month",
    },
    {
      title: "Products",
      value: products,
      icon: Package,
      gradient: "from-green-500 to-emerald-500",
      trend: "+5%",
      description: "In inventory",
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: BarChart3,
      gradient: "from-orange-500 to-red-500",
      trend: "+23%",
      description: "Total Earnings",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <div className="flex-1 ml-60 px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's what's happening today.
          </p>
        </div>

        {/* First Row: Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {states.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </p>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-500">
                      {stat.trend}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      {stat.description}
                    </span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-md`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-96">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <ShoppingCart className="h-5 w-5 text-blue-500 mr-2" />
                  Recent Orders
                </h2>
                <button className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  onClick={()=> navigate("/orders")}>
                  <Eye className="h-4 w-4 mr-1" />
                  View All
                </button>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="p-8 text-center">
                <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No orders found</p>
                <p className="text-gray-400 text-sm mt-1">
                  Orders will appear here once placed
                </p>
              </div>
            ) : (
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            #{order.id}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.date}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.customer}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            ₹{order.amount}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                              order.status === "Success"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : order.status === "Pending"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Graph - Right Side */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-96">
            <Fakeeee />
          </div>
        </div>

        {/* Third Row: Activity Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Activity Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">New Users</span>
              <span className="text-sm font-semibold text-gray-900">
                +{Math.floor(peoples * 0.1)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Orders Today</span>
              <span className="text-sm font-semibold text-gray-900">
                +{Math.floor(orders.length * 0.3)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Products Sold</span>
              <span className="text-sm font-semibold text-gray-900">
                +{Math.floor(products * 0.2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;