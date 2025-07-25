import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PriceComparisonChart = ({ id }) => {
  const [compareDate, setCompareDate] = useState("");

  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["chartData", id, compareDate],
    queryFn: async () => {
      const res = await axios.get(
        `/price-history/${id}${
          compareDate ? `?compareDate=${compareDate}` : ""
        }`
      );
      return res.data;
    },
    enabled: !!id,
  });

  const handleDateChange = (e) => {
    setCompareDate(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Price Comparison Chart
      </h2>

      <input
        type="date"
        className="mb-6 border p-2 rounded w-full"
        value={compareDate}
        onChange={handleDateChange}
      />

      {isLoading ? (
        <p>Loading chart...</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" fill="#4caf50" name="Current Price" />
            {chartData[0]?.previous !== undefined && (
              <Bar dataKey="previous" fill="#f44336" name="Previous Price" />
            )}
            {chartData[0]?.difference !== undefined && (
              <Bar dataKey="difference" fill="#2196f3" name="Difference" />
            )}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PriceComparisonChart;
