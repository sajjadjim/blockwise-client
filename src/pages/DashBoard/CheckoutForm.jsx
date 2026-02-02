import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxios from "../../hooks/useAxios";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axios = useAxios();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError("");
    setSuccess("");

    try {
      // 1. Create payment intent
      const { data } = await axios.post("/create-payment-intent", { amount });

      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setSuccess("Payment successful!");
          // TODO: save payment record to DB
        }
      }
    } catch (err) {
      setError("Payment failed.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement options={{ style: { base: { fontSize: '16px' } } }}  />
      <button type="submit" disabled={!stripe || processing} className="btn btn-primary">
        {processing ? "Processing..." : "Pay"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
