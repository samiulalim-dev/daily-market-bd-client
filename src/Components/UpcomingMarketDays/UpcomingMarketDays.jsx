import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaStore,
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";

const marketDays = [
  {
    id: 1,
    market: "Karwan Bazar",
    location: "Tejgaon, Dhaka",
    days: ["Sunday", "Tuesday", "Thursday"],
    time: "6 AM - 1 PM",
  },
  {
    id: 2,
    market: "Daulatpur Bazar",
    location: "Khulna City",
    days: ["Monday", "Thursday"],
    time: "6 AM - 3 PM",
  },
  {
    id: 3,
    market: "Jatrabari Bazar",
    location: "Jatrabari, Dhaka",
    days: ["Monday", "Wednesday"],
    time: "7 AM - 12 PM",
  },
  {
    id: 4,
    market: "New Market",
    location: "Nilkhet, Dhaka",
    days: ["Friday", "Saturday"],
    time: "8 AM - 2 PM",
  },
  {
    id: 5,
    market: "Chawkbazar",
    location: "Chittagong City",
    days: ["Everyday"],
    time: "6 AM - 11 PM",
  },
  {
    id: 6,
    market: "Godagari Bazar",
    location: "Rajshahi District",
    days: ["Tuesday", "Friday"],
    time: "7 AM - 3 PM",
  },
  {
    id: 7,
    market: "Mirpur Bazar",
    location: "Mirpur-1, Dhaka",
    days: ["Sunday", "Wednesday"],
    time: "6 AM - 11 AM",
  },
  {
    id: 18,
    market: "Shyam Bazar",
    location: "Shyambazar, Dhaka",
    days: ["Saturday", "Monday"],
    time: "6 AM - 12 PM",
  },
  {
    id: 8,
    market: "Farmgate Bazar",
    location: "Farmgate, Dhaka",
    days: ["Tuesday", "Thursday"],
    time: "7 AM - 1 PM",
  },
  {
    id: 9,
    market: "Bondor Bazar",
    location: "Sylhet City",
    days: ["Saturday", "Tuesday"],
    time: "7 AM - 6 PM",
  },
  {
    id: 10,
    market: "Jatrabari Bazar",
    location: "Jatrabari, Dhaka",
    days: ["Monday", "Wednesday"],
    time: "7 AM - 12 PM",
  },
  {
    id: 11,
    market: "Port Road Bazar",
    location: "Barisal City",
    days: ["Wednesday", "Saturday"],
    time: "7 AM - 2 PM",
  },
  {
    id: 12,
    market: "Shapla Chattar Bazar",
    location: "Rangpur City",
    days: ["Sunday", "Wednesday"],
    time: "8 AM - 4 PM",
  },
];

const itemsPerPage = 3;

const UpcomingMarketDays = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(marketDays.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMarkets = marketDays.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="py-12 px-4 md:px-10 ">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-4 flex items-center justify-center gap-2">
          <FaCalendarAlt className=" hidden sm:block"></FaCalendarAlt> Upcoming
          Market Days
        </h2>
        <p className="text-gray-600 mb-10">
          Plan your shopping by knowing when and where local markets open!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentMarkets.map((market) => (
            <motion.div
              key={market.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white border border-gray-200 shadow-md p-6 rounded-2xl text-left"
            >
              <h3 className="flex items-center gap-2 text-xl font-bold text-secondary mb-2">
                <FaStore className="text-green-600" />
                {market.market}
              </h3>

              <p className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <FaMapMarkerAlt className="text-gray-400" />
                {market.location}
              </p>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <FaClock className="text-gray-400" />
                {market.time}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <FaCalendarAlt className="text-primary" />
                <div className="flex flex-wrap gap-2">
                  {market.days.map((day, i) => (
                    <span
                      key={i}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 brn rounded-lg font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
          >
            ⬅ Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 btn rounded-lg font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
          >
            Next ➡
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default UpcomingMarketDays;
