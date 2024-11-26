import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"; // Import the checkout form

const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY"); // Replace with your actual Stripe publishable key

const ShowBankDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("fundUserId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user-details/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (err) {
        setError(err.response?.status === 404 ? "User details not found." : "Error retrieving user details.");
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [userId]);
  const handleDonate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/create-payment-intent", { amount: amount * 100 }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      setError("Error creating payment intent.");
    }
  };

  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User Details</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Account No:</span>
          <span className="font-medium">{userDetails.AccountNo}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Bank:</span>
          <span className="font-medium">{userDetails.Bank}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Mobile No:</span>
          <span className="font-medium">{userDetails.mobileNo}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">UPI ID:</span>
          <span className="font-medium">{userDetails.Upi || "N/A"}</span>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-600">Donation Amount (USD):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 w-full"
        />
      </div>

      <button onClick={handleDonate} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Donate
      </button>

      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default ShowBankDetails;
