import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";

const AllUsers = () => {
  const [searchText, setSearchText] = useState("");
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  // TanStack Query for fetching users
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?search=${searchText}`);
      return res.data;
    },
  });

  const { mutate: updateUserRole, isPending } = useMutation({
    mutationFn: async ({ userId, newRole }) => {
      const res = await axiosSecure.patch(`/users/role/${userId}`, {
        role: newRole,
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      if (data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `Role updated to ${variables.newRole}`,
          timer: 1500,
          showConfirmButton: false,
        });
        queryClient.invalidateQueries(["users"]);
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Failed to update role",
        text: error.message,
      });
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="input input-bordered w-full max-w-md"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        {isLoading ? (
          <p>Loading users...</p>
        ) : (
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">
                    {user.role === "admin" && (
                      <span className="px-2 py-1 rounded-full bg-red-500 text-white font-semibold text-sm">
                        Admin
                      </span>
                    )}

                    {user.role === "vendor" && (
                      <span className="px-2 py-1 rounded-full bg-blue-500 text-white font-semibold text-sm">
                        Vendor
                      </span>
                    )}

                    {user.role === "user" && (
                      <span className="px-2 py-1 rounded-full bg-green-500 text-white font-semibold text-sm">
                        User
                      </span>
                    )}
                  </td>
                  <td>
                    <div className="flex gap-2 flex-wrap">
                      {/* Show if target user is NOT admin */}
                      {user.role !== "admin" && (
                        <button
                          onClick={() =>
                            updateUserRole({
                              userId: user._id,
                              newRole: "admin",
                            })
                          }
                          className="btn btn-sm btn-outline"
                          disabled={isPending}
                        >
                          {isPending ? "Updating..." : "Make Admin"}
                        </button>
                      )}

                      {/* Show if target user is NOT vendor */}
                      {user.role !== "vendor" && (
                        <button
                          onClick={() =>
                            updateUserRole({
                              userId: user._id,
                              newRole: "vendor",
                            })
                          }
                          className="btn btn-sm btn-outline"
                          disabled={isPending}
                        >
                          {isPending ? "Updating..." : "Make Vendor"}
                        </button>
                      )}

                      {/* Show if target user is NOT normal user */}
                      {user.role !== "user" && (
                        <button
                          onClick={() =>
                            updateUserRole({
                              userId: user._id,
                              newRole: "user",
                            })
                          }
                          className="btn btn-accent btn-sm btn-outline"
                          disabled={isPending}
                        >
                          {isPending ? "Updating..." : "Make User"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!isLoading && users.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AllUsers;
