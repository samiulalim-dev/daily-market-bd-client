import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { use, useState } from "react";

import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import useAxios from "../../Hooks/useAxios/useAxios";
import PriceComparisonChart from "./PriceComparisonChart/PriceComparisonChart";
import useUserRole from "../../Hooks/useUserRole/useUserRole";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import ReviewSection from "./ReviewSection/ReviewSection";
import Loading from "../../Shared/Logo/Loading/Loading";

const ViewDetails = () => {
  const { id } = useParams();
  const [watchListLoading, setWatchListLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const { role } = useUserRole();
  const navigate = useNavigate();
  const { data: product, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  const handleWatchlist = async () => {
    setWatchListLoading(true);
    try {
      await axiosSecure.post(`/watchlist`, {
        userEmail: user?.email,
        productId: id,
        productName: product.itemName,
        marketName: product.marketName,
        addedAt: new Date(),
      });
      setWatchListLoading(false);
      toast.success("Added to watchlist");
    } catch (error) {
      toast.error("Failed to add to watchlist");
    }
  };

  const handleBuy = () => {
    navigate(`/checkout/${product._id}`);
  };

  if (!product) return <Loading></Loading>;

  return (
    <div className="">
      <div className="max-w-4xl mx-auto p-5 bg-base-200 m-7 rounded-2xl shadow-2xl  space-y-3">
        <h2 className="text-2xl font-bold">{product.itemName}</h2>
        <img
          src={product.productImage}
          alt="product"
          className="w-full h-64 object-cover rounded"
        />
        <p>
          <strong>Market:</strong> {product.marketName}
        </p>
        <p>
          <strong>Date:</strong> {product.date}
        </p>

        <div>
          <h3 className="text-xl font-semibold">Item List:</h3>
          <ul className="list-disc ml-5">
            <li>
              {product.itemName} — ৳{product.pricePerUnit}/kg
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Vendor Info:</h3>
          <p>Name: {product.vendorName}</p>
          <p>Email: {product.vendorEmail}</p>
        </div>

        {role === "user" && (
          <div className="space-x-4">
            <button className="btn btn-primary text-white" onClick={handleBuy}>
              Buy Product
            </button>
            <button
              className="btn btn-secondary text-white"
              disabled={watchListLoading}
              onClick={handleWatchlist}
            >
              {watchListLoading ? "Loading..." : "Add to Watchlist"}
            </button>
          </div>
        )}

        <div>
          <ReviewSection productId={product._id}></ReviewSection>
        </div>

        {/* <div>
          <h3 className="text-xl font-semibold">User Reviews:</h3>
          {reviews.map((review, idx) => (
            <div key={idx} className="border p-2 rounded mb-2">
              <p>
                <strong>{review.name}</strong> ({review.email}) - ⭐{" "}
                {review.rating}
              </p>
              <p>{review.comment}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          ))}
        </div> */}
        {/* <div>
          <PriceComparisonChart productId={product._id}></PriceComparisonChart>
        </div> */}
      </div>
    </div>
  );
};

export default ViewDetails;
