import { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import StripeProvider from "../../StripeProvider/StripeProvider";
import CheckoutForm from "../../Components/CheckoutForm/ChekcoutForm";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

const StripeCheckoutPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { data: product, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/products/${id}`);
      return res.data;
    },
  });

  if (!product) return <p>Loading...</p>;

  return (
    <div className="max-w-md bg-gray-200  mx-auto p-8 rounded-2xl my-10">
      <h2 className="text-xl font-bold mb-4">
        Checkout for: {product.itemName}
      </h2>
      <StripeProvider>
        <CheckoutForm product={product} />
      </StripeProvider>
    </div>
  );
};

export default StripeCheckoutPage;
