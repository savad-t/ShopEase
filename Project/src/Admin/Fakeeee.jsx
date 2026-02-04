import React, { useEffect, useState } from "react";
import {PieChart,Pie,Cell,Tooltip,Legend,ResponsiveContainer,} from "recharts";
import api from "../Api/Axios_Instance";

// Colors 
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Fakeeee = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/users"); // your JSON server
        const users = res.data;

        const categoryCount = {};

        // Loop through all users and their orders
        users.forEach((user) => {
          const orders = user.orders || [];
          orders.forEach((order) => {
            const cart = order.cart || [];
            cart.forEach((item) => {
              const category = item.category || "Unknown";
              const qty = item.quantity || 1;

              if (!categoryCount[category]) categoryCount[category] = 0;
              categoryCount[category] += qty;
            });
          });
        });

        // Convert object to array for chart
        const data = Object.entries(categoryCount).map(([name, value]) => ({
          name,
          value,
        }));

        setChartData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

 return (
  <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h2 className="text-xl font-semibold text-gray-900 text-center mb-5">
      📊 Category-wise Sold Products
    </h2>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          innerRadius={60}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
};

export default Fakeeee;

