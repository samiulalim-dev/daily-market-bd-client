import React from "react";
import { motion } from "framer-motion";
import vegetable from "../../assets/vegetable.jpg";
const AboutUs = () => {
  return (
    <section className="bg-gradient-to-b from-green-50 to-white py-16 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="w-11/12 mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            About <span className="text-green-700">Daily Market </span>
            <span className="text-orange-500">BD</span>
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Daily Market BD is an easy-to-use platform where you can check daily
            market prices. Our mission is to bring transparency and convenience
            for both buyers and sellers in the local markets.
          </p>

          {/* Key Features */}
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="bg-green-100 text-green-600 p-2 rounded-full">
                ✔
              </span>
              <span className="text-gray-700">
                Live price updates from local markets
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-green-100 text-green-600 p-2 rounded-full">
                ✔
              </span>
              <span className="text-gray-700">
                Vendor and user dashboards for easy management
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-green-100 text-green-600 p-2 rounded-full">
                ✔
              </span>
              <span className="text-gray-700">
                Admin control and enhanced security
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-green-100 text-green-600 p-2 rounded-full">
                ✔
              </span>
              <span className="text-gray-700">
                Daily market trends & insights
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-green-100 text-green-600 p-2 rounded-full">
                ✔
              </span>
              <span className="text-gray-700">
                Custom notifications for price changes
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-green-100 text-green-600 p-2 rounded-full">
                ✔
              </span>
              <span className="text-gray-700">
                Supports transparency between buyers and sellers
              </span>
            </li>
          </ul>

          {/* Mission, Vision, Values */}
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">🎯</span>
              <p className="text-gray-700">
                <strong>Our Mission:</strong> Provide accurate and timely market
                information for everyone.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">👁️</span>
              <p className="text-gray-700">
                <strong>Our Vision:</strong> Create a transparent marketplace
                where buyers and sellers can thrive.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-green-600 text-xl">💡</span>
              <p className="text-gray-700">
                <strong>Our Values:</strong> Accuracy, Trust, and
                Community-focused service.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src={vegetable}
            alt="Market illustration"
            className="w-full rounded-2xl shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
