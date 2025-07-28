import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { use, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";
import Loading from "../../../Shared/Logo/Loading/Loading";

const MyOrders = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Order List</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th>Product Name</th>
              <th>Market Name</th>
              <th>Price</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover">
                <td>{order.product?.itemName}</td>
                <td>{order.product?.marketName}</td>
                <td>{order.price}</td>
                <td>{new Date(order.buyDate).toLocaleDateString()}</td>
                <td>
                  <Link
                    className=" btn btn-primary text-white"
                    to={`/products/${order.productId}`}
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
