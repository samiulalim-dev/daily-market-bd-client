import { use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import Loading from "../../../Shared/Logo/Loading/Loading";
import { MdInventory } from "react-icons/md";

const MyProducts = () => {
  const { user } = use(AuthContext);
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  //  Fetch vendor-specific products
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["my-products", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`vendor/products?email=${user?.email}`);
      return res.data;
    },
  });

  //  Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/products/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-products"]);
      Swal.fire("Deleted!", "Product has been deleted.", "success");
    },
    onError: (err) => {
      Swal.fire("Error", err.message, "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <MdInventory className="text-primary text-3xl" />
        My Products
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Market Name</th>
                <th>Status</th>
                <th>Price</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={product.productImage}
                      alt={product.itemName}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td>{product.itemName}</td>
                  <td>{product.marketName}</td>
                  <td>
                    <span
                      className={`badge ${
                        product.status === "approved"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td>৳{product.pricePerUnit}</td>
                  <td>{product.date}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn mb-1 md:mb-0 btn-sm btn-error text-white"
                    >
                      Delete
                    </button>
                    <button className="btn btn-sm btn-outline ml-2">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyProducts;
