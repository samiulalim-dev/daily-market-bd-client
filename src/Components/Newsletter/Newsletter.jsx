import { motion } from "framer-motion";
import vegetable from "../../assets/vegetable.png";
const Newsletter = () => {
  return (
    <section className="bg-gradient-to-r from-green-50 to-green-100 py-16">
      <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 text-lg">
            Stay updated with the latest market prices, offers, and exclusive
            deals directly in your inbox. Be the first to know what's trending
            in your local market.
          </p>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 rounded-l-xl border border-gray-300 w-full md:w-2/3 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white cursor-pointer px-5 py-3 rounded-r-xl hover:bg-green-700 transition"
            >
              Subscribe
            </button>
          </form>
          {/* px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg */}

          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src={vegetable}
            alt="Newsletter illustration"
            className="w-80 md:w-[400px] drop-shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
