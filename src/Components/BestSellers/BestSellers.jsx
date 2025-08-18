import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loading from "../../Shared/Logo/Loading/Loading";
import useAxios from "../../Hooks/useAxios/useAxios";
import Countdown from "react-countdown";

const BestSellers = () => {
  const axiosInstance = useAxios();

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["best-sellers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/products/best-sellers");
      return res.data;
    },
  });

  const getRandomTime = () => {
    const now = Date.now();
    const randomDays = Math.floor(Math.random() * 10) + 1; // 1–10 d
    const randomHours = Math.floor(Math.random() * 24); // 0–23 h
    const randomMinutes = Math.floor(Math.random() * 60); // 0–59 m
    return (
      now +
      randomDays * 24 * 60 * 60 * 1000 +
      randomHours * 60 * 60 * 1000 +
      randomMinutes * 60 * 1000
    );
  };

  const endDate = React.useMemo(() => getRandomTime(), []);

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span className="bg-green-700 text-white px-2  py-1 rounded-sm">
          Expired
        </span>
      );
    } else {
      return (
        <span className="bg-green-700 text-white space-x-4 px-2 sm:px-8 py-4 rounded-2xl text-md font-semibold">
          <span>{days}d</span>
          <span>:</span>
          <span>{hours}h</span>
          <span>:</span>
          <span>{minutes}m</span>
          <span>:</span>
          <span>{seconds}s</span>
        </span>
      );
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-red-500">❌ Something went wrong!</p>;

  return (
    <section className="w-11/12 mx-auto py-12">
      {/* Title + View All */}
      <div className="flex items-center flex-col sm:flex-row sm:justify-between mb-8">
        <h2 className="text-3xl md:text-4xl text-center sm:text-start mb-4 sm:mb-0 font-bold text-green-700">
          Our Best Sellers Products
        </h2>
        <Link
          to="/allProducts"
          className="px-4 py-2 btn rounded-lg font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
        >
          View All Products
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => {
          const discounts = [40, 15, 25, 30, 35, 40];
          const discount = discounts[index % discounts.length];
          return (
            <div
              key={product.id || product._id}
              className="relative bg-white shadow-md p-4 rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src={product.productImage}
                  alt={product.itemName}
                  className="h-70 w-full object-cover rounded-xl mb-3"
                />
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 bg-green-700 text-white text-xs font-bold px-5 py-3 rounded-full shadow-md">
                  {discount}% OFF
                </div>

                {/* Timer Badge → Images  bottom  overlay */}
                <div className="absolute bottom-6  left-1/2 -translate-x-1/2">
                  <Countdown date={endDate} renderer={renderer} />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {product.itemName}
              </h3>
              <p className="text-green-700 font-medium">
                {product.itemDescription}
              </p>
              <p className="text-gray-500 font-medium">
                ৳ {product.pricePerUnit}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BestSellers;
