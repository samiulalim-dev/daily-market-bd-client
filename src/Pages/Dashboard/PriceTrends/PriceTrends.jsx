import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const PriceTrends = () => {
  const [trendData, setTrendData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios
      .get("https://daily-market-bd-server.vercel.app/api/price-trends")
      .then((res) => setTrendData(res.data))
      .catch((err) => console.error("Error fetching price trends:", err));
  }, []);

  const uniqueItems = [...new Set(trendData.map((item) => item.itemName))];

  const filteredData = selectedItem
    ? trendData.filter((item) => item.itemName === selectedItem)
    : [];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        📊 Filter Product-wise Price Trends
      </h2>

      {/* === Product Filter Buttons === */}
      <div className="flex flex-wrap gap-3 mb-6">
        {uniqueItems.map((item) => (
          <button
            key={item}
            onClick={() => setSelectedItem(item)}
            className={`px-4 py-2 cursor-pointer rounded-full border ${
              selectedItem === item
                ? "bg-green-600 text-white"
                : "bg-white text-gray-800 hover:bg-green-100"
            }`}
          >
            {item}
          </button>
        ))}
        {selectedItem && (
          <button
            onClick={() => setSelectedItem(null)}
            className="px-4 py-2 rounded-full bg-red-500 text-white"
          >
            ❌ Clear Filter
          </button>
        )}
      </div>

      {/* === Line Chart === */}
      {filteredData.length > 0 ? (
        filteredData.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-xl p-4 mb-8"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={product.productImage}
                alt={product.itemName}
                className="w-16 h-16 rounded"
              />
              <div>
                <h3 className="text-xl font-semibold">{product.itemName}</h3>
                <p className="text-gray-500">Market: {product.marketName}</p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={product.prices}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#4CAF50"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ))
      ) : (
        <p className="text-gray-500">👈 Select a product</p>
      )}
    </div>
  );
};

export default PriceTrends;
