import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";

const ViewDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {
    data: product = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500 text-center mt-8">❌ {error.message}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <img
          src={product.imageURL}
          alt={product.itemName}
          className="w-full rounded-lg shadow-lg"
        />

        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-xl text-primary font-semibold mb-2">
            ৳ {product.price}
          </p>
          <p className="mb-1">
            <strong>📅 Date:</strong>{" "}
            {new Date(product.date).toLocaleDateString()}
          </p>
          <p className="mb-1">
            <strong>📍 Market:</strong> {product.marketName}
          </p>
          <p className="mb-1">
            <strong>👤 Vendor:</strong> {product.vendorName}
          </p>
          <p className="mt-4 text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
