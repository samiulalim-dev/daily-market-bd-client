import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import useUserRole from "../../../Hooks/useUserRole/useUserRole";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import Loading from "../../../Shared/Logo/Loading/Loading";
import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import {
  FaUsers,
  FaBoxOpen,
  FaAd,
  FaShoppingCart,
  FaEye,
  FaDollarSign,
  FaBullhorn,
  FaShoppingBag,
  FaStar,
} from "react-icons/fa";

import { Link } from "react-router";
const DashboardOverview = () => {
  const axiosSecure = useAxiosSecure();
  const { role } = useUserRole();
  const { user } = use(AuthContext);
  //   console.log(user?.email, role);
  const { data: stat = [], isLoading } = useQuery({
    queryKey: ["dashboardStats", role, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard-stats?role=${role}&email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!role && !!user?.email,
  });

  const statObject = stat[0];
  // console.log(statObject);

  const chartData = stat[0]
    ? Object.keys(stat[0]).map((key) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize
        value: stat[0][key],
      }))
    : [];
  // console.log(chartData);
  if (isLoading) return <Loading></Loading>;

  return (
    <div className="space-y-10 py-16 bg-base-200 ">
      {/* Stats Cards */}
      <div>
        {/* User Stats */}
        {role === "user" && (
          <div className="grid grid-cols-1  w-11/12 mx-auto md:grid-cols-3 gap-6">
            <>
              {/* My Orders */}
              <StatCard
                title="My Orders"
                buttonText="View All Orders"
                buttonLink="/dashboard/orders"
                value={statObject.orders || 0}
                icon={<FaShoppingBag className="text-[#2563eb] w-8 h-8" />}
                description={
                  <span className="flex items-center text-gray-700 text-sm">
                    Total orders you have placed so far
                  </span>
                }
              />

              {/* My Watchlist */}
              <StatCard
                title="My Watchlist"
                buttonText="My Watchlist"
                buttonLink="/dashboard/watchlist"
                value={statObject.watchlist || 0}
                icon={<FaEye className="text-[#9333ea] w-8 h-8" />}
                description={
                  <span className="flex items-center text-gray-700 text-sm">
                    Items you saved to monitor for future purchase
                  </span>
                }
              />

              {/* My Reviews */}
              <StatCard
                title="My Reviews"
                value={statObject.review || 0}
                icon={<FaStar className="text-[#f59e0b] w-8 h-8" />}
                description={
                  <span className="flex items-center text-gray-700 text-sm">
                    Feedback and ratings you provided on products
                  </span>
                }
              />
            </>
          </div>
        )}

        {/* Vendor Stats */}
        {role === "vendor" && (
          <div className="grid grid-cols-1  w-11/12 mx-auto md:grid-cols-3 gap-6">
            <>
              {/* My Products */}
              <StatCard
                title="My Products"
                buttonText="View All Products"
                buttonLink="/dashboard/home"
                value={statObject.totalProducts || 0}
                icon={<FaBoxOpen className="text-blue-600 w-8 h-8" />}
                description={
                  <span className="flex items-center text-gray-700 text-sm">
                    Total products you have added and are currently managing
                  </span>
                }
              />
              {/* Total Advertisements */}
              <StatCard
                title="Total Advertisements"
                buttonText="View All Ads"
                buttonLink="/dashboard/my-advertisements"
                value={statObject.totalAdvertisements || 0}
                icon={<FaBullhorn className="text-orange-500 w-8 h-8" />}
                description={
                  <span className="flex items-center text-gray-700 text-sm">
                    Number of active advertisements promoting your products
                  </span>
                }
              />
              {/* Total Revenue */}
              <StatCard
                title="Total Revenue"
                value={`$${statObject.totalRevenue || 0}`}
                icon={<FaDollarSign className="text-green-600 w-8 h-8" />}
                description={
                  <span className="flex items-center text-gray-700 text-sm">
                    Total income generated from user purchases across all
                    products
                  </span>
                }
              />
            </>
          </div>
        )}

        {/* Admin Stats */}
        {role === "admin" && (
          <div className="grid grid-cols-1  w-11/12 mx-auto md:grid-cols-3 gap-6">
            {/* Left side: Watch List */}
            <div className="md:col-span-1 flex flex-col-1">
              <StatCard
                title="Total Watch List"
                value={statObject.watchList || 0}
                icon={<FaEye className="text-[#2f0582] w-8 h-8" />}
                description={
                  <span className="flex items-center text-lg  text-gray-700 leading-relaxed">
                    Total number of items that users have added to their
                    personal watchlists. This helps the admin track which
                    products are getting the most attention and identify
                    potential high-demand items.
                  </span>
                }
              />
            </div>

            {/* Right side: Other stats */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <StatCard
                title="Total Users"
                value={statObject.users || 0}
                buttonText="View All Users"
                buttonLink="/dashboard/home"
                icon={<FaUsers className="text-blue-600 w-8 h-8" />}
                description={
                  <span className="flex items-center text-lg text-gray-700">
                    Active users on the platform
                  </span>
                }
              />

              <StatCard
                title="Total Products"
                buttonText="View All Products"
                buttonLink="/dashboard/all-products"
                value={statObject.products || 0}
                icon={<FaBoxOpen className="text-[#117a0b] w-8 h-8" />}
                description={
                  <span className="flex items-center text-lg text-gray-700">
                    Products listed by vendors
                  </span>
                }
              />

              <StatCard
                title="Total Ads"
                buttonText="View All Ads"
                buttonLink="/dashboard/all-ads"
                value={statObject.ads || 0}
                icon={<FaAd className="text-yellow-500 w-8 h-8" />}
                description={
                  <span className="flex items-center text-lg text-gray-700">
                    Active advertisements running
                  </span>
                }
              />

              <StatCard
                title="Total Orders"
                buttonText="View All Orders"
                buttonLink="/dashboard/all-orders"
                value={statObject.orders || 0}
                icon={<FaShoppingCart className="text-red-500 w-8 h-8" />}
                description={
                  <span className="flex items-center text-lg text-gray-700">
                    Orders placed by users
                  </span>
                }
              />
            </div>
          </div>
        )}
      </div>
      {/* Chart */}
      <div className=" bg-white shadow md:w-11/12 md:mx-auto rounded-xl md:p-6 mx-1">
        <h3 className="text-lg text-black font-semibold mb-4 text-center">
          Statistics Chart
        </h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              width={500}
              height={400}
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0FBD6B"
                fill="#0FBD6B"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">
            No data available for chart
          </p>
        )}
      </div>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({
  title,
  value,
  icon,
  description,
  buttonText,
  buttonLink,
}) => (
  <div className="rounded-xl bg-gradient-to-t from-emerald-500 to-teal-600 shadow p-6 flex flex-col items-center justify-between gap-4 hover:scale-105 transition-transform duration-300">
    <div className=" flex items-center gap-4 flex-col">
      {/* Icon */}
      <div className="text-white bg-white/30 p-3 rounded-full">{icon}</div>

      {/* Title & Value */}
      <div className="text-center">
        <h3 className="text-lg font-medium text-white">{title}</h3>
        <p className="text-2xl font-bold text-yellow-300 mt-1">{value}</p>
        {description && (
          <div className="mt-1 text-sm text-gray-100">{description}</div>
        )}
      </div>
    </div>

    {/* Button */}
    {buttonText && buttonLink && (
      <Link
        to={buttonLink}
        className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 border-2 border-white text-white hover:bg-green-700 hover:text-white hover:border-none  "
      >
        {buttonText}
      </Link>
    )}
  </div>
);

export default DashboardOverview;
