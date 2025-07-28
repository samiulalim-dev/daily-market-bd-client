import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/AxiosSecure/useAxiosSecure";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useNavigate } from "react-router";

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const price = Number(product.pricePerUnit);

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

    if (confirmError) {
      toast.error(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      // Save in DB
      const paymentInfo = {
        userEmail: user?.email,
        productId: product._id,
        product: product,
        transactionId: paymentIntent.id,
        price,
        buyDate: new Date(),
      };

      const res = await axiosSecure.post("/buy-product", paymentInfo);

      if (res.data.insertedId) {
        toast.success("✅ Product purchased successfully!");
        navigate("/dashboard/orders");
      } else {
        toast.error("❌ Failed to save purchase!");
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement></CardElement>
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing}
        className="btn btn-primary text-white mt-4"
      >
        {processing ? "Processing..." : "Pay & Buy"}
      </button>
    </form>
  );
};

export default CheckoutForm;
