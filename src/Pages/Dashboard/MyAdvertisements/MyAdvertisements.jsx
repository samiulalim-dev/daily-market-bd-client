import { useQuery } from "@tanstack/react-query";

import { use, useState } from "react";

import { AuthContext } from "../../../AuthProvider/AuthProvider";
import UpdateAdModal from "./UpdateModal";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Logo/Loading/Loading";
import { p } from "framer-motion/client";

const MyAdvertisements = () => {
  const { user } = use(AuthContext);
  const [selectedAd, setSelectedAd] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    data: myAds = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-ads", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/advertisements?vendorEmails=${user.email}`
      );
      return res.data;
    },
  });
  // console.log(myAds);
  const handleDelete = (adId) => {
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
        axiosSecure.delete(`/advertisements/${adId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "Deleted!",
              "Your advertisement has been deleted.",
              "success"
            );
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) return <Loading></Loading>;
  return (
    <div className=" px-1 sm:px-4 my-2 sm:my-10">
      <h2 className="text-2xl font-bold mb-4">📢 My Advertisements</h2>
      <div className=" overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-200 text-gray-800">
            <tr>
              <th>Ad Title</th>
              <th>Description</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myAds.length === 0 ? (
              <td className="  text-xl py-2">You have no ads.</td>
            ) : (
              myAds.map((ad) => (
                <tr key={ad._id} className="border-b hover:bg-gray-50">
                  <td>{ad.title}</td>
                  <td>{ad.description.slice(0, 40)}...</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        ad.status === "approved"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {ad.status}
                    </span>
                  </td>
                  <td className="flex gap-1 sm:gap-2 flex-col sm:flex-row justify-center">
                    <button
                      onClick={() => {
                        setSelectedAd(ad);
                        setIsUpdateOpen(true);
                      }}
                      className="px-3 py-1 text-sm cursor-pointer bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isUpdateOpen && selectedAd && (
        <UpdateAdModal
          ad={selectedAd}
          onClose={() => setIsUpdateOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default MyAdvertisements;
