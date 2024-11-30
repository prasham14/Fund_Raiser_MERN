import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const ShowBankDetails = ({ setActivesection }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [amount, setAmount] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("fundUserId");
  const handleBack = () => {
    setActivesection('viewFundRaiser');
  };
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

  const handlePay = () => {
    setActivesection('pay')
  }
  if (loading) return <p className="text-center text-blue-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <button onClick={handleBack}><FaArrowLeft /></button>
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
      <button onClick={handlePay}>Donate</button>
    </div>
  );
};

export default ShowBankDetails;
