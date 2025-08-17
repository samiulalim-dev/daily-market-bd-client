import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loading from "../../Shared/Logo/Loading/Loading";

const BestSellers = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["best-sellers"],
    queryFn: async () => {
      const res = await fetch("/api/products/best-sellers"); // আপনার API endpoint
      return res.json();
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return <p className="text-center text-red-500">❌ Something went wrong!</p>;

  return (
    <section className="w-11/12 mx-auto py-12">
      {/* Title + View All */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Our Best Sellers</h2>
        <Link
          to="/products"
          className="text-sm md:text-base bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          View All Products
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-2xl p-4 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-cover rounded-xl mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-green-700 font-medium">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
