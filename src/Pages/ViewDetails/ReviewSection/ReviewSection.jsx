import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useContext, useState } from "react";
import moment from "moment";

import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import useAxiosSecure from "../../../Hooks/AxiosSecure/useAxiosSecure";

const ReviewSection = ({ productId }) => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(null);
  const { register, handleSubmit, reset, setValue } = useForm();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${productId}`);
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post(`/reviews`, reviewData);
      return res.data;
    },
    onSuccess: () => {
      reset();
      setSelectedRating(0);
      queryClient.invalidateQueries(["reviews", productId]);
    },
  });

  const onSubmit = (data) => {
    const review = {
      productId,
      name: user?.displayName,
      email: user?.email,
      comment: data.comment,
      rating: selectedRating,
      date: new Date(),
    };
    mutate(review);
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    setValue("rating", rating);
  };

  return (
    <div className="bg-white p-4 mt-6 rounded-xl shadow-md">
      <h2 className="text-xl text-black font-semibold mb-4">
        📝 Review & Comments
      </h2>

      {user ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className={`cursor-pointer transition-colors ${
                    (hoveredStar || selectedRating) >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                />
              ))}
            </div>
            <input type="hidden" {...register("rating", { required: true })} />
          </div>

          <div>
            <label className="font-medium text-black block mb-1">
              Your Comment
            </label>
            <textarea
              {...register("comment", { required: true })}
              className="border text-black w-full rounded px-3 py-1"
              rows={3}
              placeholder="Write your feedback "
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
          >
            Submit Review
          </button>
        </form>
      ) : (
        <p className="text-gray-600">Please login to submit a review.</p>
      )}

      <div className="mt-6">
        <h3 className="font-semibold text-black mb-2">📋 All Reviews</h3>
        {reviews.length === 0 && <p className="text-black">No reviews yet.</p>}
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review._id} className="bg-gray-100 p-3 rounded">
              <div className="flex justify-between items-center">
                <p className="font-medium">
                  {review.name} ({review.email})
                </p>
                <span className="text-sm text-gray-500">
                  {moment(review.date).format("MMMM Do YYYY, h:mm a")}
                </span>
              </div>
              <div className="flex items-center gap-1 text-yellow-400 mt-1">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={
                      index < review.rating ? "fill-current" : "text-gray-300"
                    }
                  />
                ))}
                <span className="text-gray-600 text-sm ml-2">
                  ({review.rating}/5)
                </span>
              </div>
              <p className="mt-1 text-gray-800">{review.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReviewSection;
