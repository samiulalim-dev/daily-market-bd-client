import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios/useAxios";
import Loading from "../../Shared/Logo/Loading/Loading";
import { FaShoppingBag } from "react-icons/fa";
import { useState } from "react";

const itemsPerPage = 12;
const AllProducts = () => {
  const axiosInstance = useAxios();

  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: products = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["public-products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/products/public");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return <p className="text-red-500 text-center mt-8">❌ {error.message}</p>;
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const allProduct = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
        <FaShoppingBag className="text-pink-600" />
        All Market Products
      </h2>
      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="card bg-base-200 shadow-xl">
            <figure>
              <img
                src={product.productImage}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.itemName}</h2>

              <p className="text-primary font-bold">৳ {product.pricePerUnit}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-outline btn-primary">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {allProduct.length !== 0 && (
        <div className="flex mt-10 justify-center items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="btn  bg-primary disabled:opacity-50"
          >
            ⬅ Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="btn bg-primary   disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
