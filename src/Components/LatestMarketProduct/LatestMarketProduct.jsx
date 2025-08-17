import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaShoppingBasket } from "react-icons/fa";
import Loading from "../../Shared/Logo/Loading/Loading";
import useAxios from "../../Hooks/useAxios/useAxios";
import { Link } from "react-router";
const LatestMarketProduct = () => {
  const axiosInstance = useAxios();
  // console.log(ads);
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["latest-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products/home-products");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return <p className="text-center text-red-500">❌ Something went wrong!</p>;
  return (
    <div className=" my-7 md:my-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl  font-bold text-center text-green-700 mb-4 flex items-center justify-center gap-2">
            <FaShoppingBasket className="text-green-700" />
            Latest Market Products
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Get the most recent price updates from different markets. Stay
            informed with today’s local rates for your daily essentials.
          </p>
        </div>
        <div className=" grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-xl p-4  rounded-2xl"
            >
              <img
                src={product.productImage}
                alt={product.itemName}
                className="h-40 w-full object-cover rounded-xl mb-3"
              />
              <h3 className="text-lg font-semibold">{product.marketName}</h3>
              <p className="text-sm text-gray-500">
                📅 {new Date(product.date).toLocaleDateString()}
              </p>

              <div className="mt-3">
                <p className="text-sm">
                  🧾 <strong>{product.itemName}</strong> — ৳
                  {product.pricePerUnit}/kg
                </p>
              </div>

              <div className="mt-4">
                <Link
                  to={`/products/${product._id}`}
                  className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LatestMarketProduct;
