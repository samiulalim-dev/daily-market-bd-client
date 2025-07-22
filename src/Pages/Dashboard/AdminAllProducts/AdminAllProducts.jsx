import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import UpdateProductModal from "../UpdateProdcutModal/UpadateProductModal";
import Loading from "../../../Shared/Logo/Loading/Loading";
const itemsPerPage = 8;
const AdminAllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: allProducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["admin-all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/products");
      return res.data;
    },
  });

  const handleApprove = async (productId) => {
    await axiosSecure.patch(`/admin/products/approve/${productId}`);
    refetch();
  };

  const handleReject = async (productId) => {
    const { value: reason } = await Swal.fire({
      title: "Reason for rejection?",
      input: "text",
      inputLabel: "Please specify a reason",
      inputPlaceholder: "e.g., Image is not clear...",
      showCancelButton: true,
    });

    if (reason) {
      await axiosSecure.patch(`/admin/products/reject/${productId}`, {
        reason,
      });
      refetch();
    }
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This product will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/admin/products/${productId}`);
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        refetch();
      }
    });
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setIsUpdateOpen(true);
  };

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const allProduct = allProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Items Name</th>
              <th>Vendor</th>
              <th>Status</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProduct.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.itemName}</td>
                <td>{product.vendorEmail}</td>
                <td>
                  <span
                    className={`badge ${
                      product.status === "approved"
                        ? "badge-success"
                        : product.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td>{product.pricePerUnit}</td>
                <td className="space-x-1 space-y-1 ">
                  <button
                    onClick={() => handleApprove(product._id)}
                    disabled={product.status === "approved"}
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(product._id)}
                    disabled={product.status === "rejected"}
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleUpdate(product)}
                    className="btn btn-xs btn-warning"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-xs btn-outline btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

      {isUpdateOpen && selectedProduct && (
        <UpdateProductModal
          isOpen={isUpdateOpen}
          setIsOpen={setIsUpdateOpen}
          product={selectedProduct}
          closeModal={() => setSelectedProduct(null)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default AdminAllProducts;
