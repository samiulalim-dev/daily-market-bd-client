import { motion } from "framer-motion";
import { Link } from "react-router";
import bannerImg from "../../assets/vegetable2.jpg";
const Banner = () => {
  return (
    <section
      style={{ backgroundImage: `url(${bannerImg})` }}
      className="bg-cover relative bg-center min-h-[80vh] flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center  p-6 max-w-2xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get Daily Local Market Prices
        </h1>
        <p className="text-lg mb-6">
          Track, compare & shop smart from your nearby vendors.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/allProducts" className="btn text-white bg-primary">
            Explore Products
          </Link>
          <Link to="/signUp" className="btn btn-outline  hover:bg-secondary">
            Sign Up
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
