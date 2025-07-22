import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import Loading from "../../../Shared/Logo/Loading/Loading";

const AllAdvertisements = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allAds = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-ads"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/advertisements");
      return res.data;
    },
  });

  const handleStatusChange = (ad, newStatus) => {
    axiosSecure
      .patch(`/admin/advertisements/${ad._id}`, { status: newStatus })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Updated!", `Status changed to ${newStatus}`, "success");
          refetch();
        }
      });
  };

  const handleDelete = (adId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this ad!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/admin/advertisements/${adId}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Advertisement has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Advertisements</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Vendor</th>
            <th>Status</th>
            <th>Change Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allAds.map((ad) => (
            <tr key={ad._id}>
              <td>{ad.title}</td>
              <td>{ad.vendorEmail}</td>
              <td>
                <span
                  className={`badge ${
                    ad.status === "approved"
                      ? "badge-success"
                      : ad.status === "rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {ad.status}
                </span>
              </td>
              <td className="space-x-2">
                <button
                  onClick={() => handleStatusChange(ad, "approved")}
                  className="btn btn-xs btn-success"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(ad, "rejected")}
                  className="btn btn-xs btn-error"
                >
                  Reject
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleDelete(ad._id)}
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
  );
};

export default AllAdvertisements;
