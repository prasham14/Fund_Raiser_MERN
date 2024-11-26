import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { error, paymentIntent } = await stripe.confirmCardPayment("{CLIENT_SECRET_FROM_OPTIONS}", {
      payment_method: { card: cardElement },
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      setError(null);
      setSucceeded(true);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <CardElement className="p-3 border rounded-md border-gray-300" />
      <button type="submit" disabled={!stripe || processing || succeeded} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
        {processing ? "Processing…" : "Pay Now"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {succeeded && <div className="text-green-500 mt-2">Payment successful!</div>}
    </form>
  );
};

export default CheckoutForm;
