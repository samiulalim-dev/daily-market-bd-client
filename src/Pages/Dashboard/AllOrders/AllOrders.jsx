import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../Shared/Logo/Loading/Loading";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allOrders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;
  if (isError)
    return <p className="text-center text-red-500">Failed to load orders</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">📋 All Orders</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>Product</th>
              <th>Market</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order._id}>
                <td>{idx + 1}</td>
                <td>{order.userEmail}</td>
                <td>{order.product?.itemName}</td>
                <td>{order.product?.marketName}</td>
                <td>৳{order.price}</td>
                <td>{new Date(order.buyDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      order.product?.status === "pending"
                        ? "badge-warning"
                        : order.status === "completed"
                        ? "badge-success"
                        : "badge-ghost"
                    }`}
                  >
                    {order.product?.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
