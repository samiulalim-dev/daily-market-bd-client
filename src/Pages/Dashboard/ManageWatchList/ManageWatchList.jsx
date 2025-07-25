import { use, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import Loading from "../../../Shared/Logo/Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const ManageWatchlist = () => {
  const { user, loading } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: watchlist = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["watchlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/watchlist/${user?.email}`);
      return res.data;
    },
  });

  //   const handleRemove = (productId) => {
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "Do you want to remove this product from watchlist?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#dc3545",
  //       cancelButtonColor: "#6c757d",
  //       confirmButtonText: "Yes, remove it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         axiosSecure
  //           .delete(`/watchlist`, {
  //             data: { productId, email: user.email },
  //           })
  //           .then((res) => {
  //             if (res.data.deletedCount > 0) {
  //               toast.success("Removed from watchlist");
  //               setWatchlist((prev) =>
  //                 prev.filter((item) => item.productId !== productId)
  //               );
  //             }
  //           })
  //           .catch(() => toast.error("Failed to remove"));
  //       }
  //     });
  //   };
  const handleRemove = (productId) => {
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
        axiosSecure.delete(`/watchlist/${productId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Items Removed from watchlist");
            refetch();
          }
        });
      }
    });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">📌 My Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No items in watchlist.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Product</th>
                <th>Market</th>
                <th>Added On</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.productName || "N/A"}</td>
                  <td>{item.marketName || "N/A"}</td>
                  <td>{new Date(item.addedAt).toLocaleDateString()}</td>
                  <td className="flex gap-2 justify-center">
                    <Link to="/allProducts">
                      <button className="btn btn-sm btn-outline btn-success">
                        ➕ Add More
                      </button>
                    </Link>
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      ❌ Remove
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

export default ManageWatchlist;
