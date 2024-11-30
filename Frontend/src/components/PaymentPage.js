import React, { useState } from 'react';
import axios from 'axios';

const PaymentComponent = () => {
  const [amount, setAmount] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token'); // Get token from localStorage

  // Handle Payment Order Creation
  const handlePayment = async () => {
    setLoading(true);

    try {
      // Step 1: Request order creation from the server
      const { data } = await axios.post(
        'http://localhost:5000/order', // Update with correct endpoint
        { amount }, // Send amount as part of the body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        }
      );

      if (data.data) {
        const { id: order_id } = data.data; // Razorpay Order ID
        console.log(data);
        // Step 2: Initialize Razorpay Checkout
        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay Key ID
          amount: amount * 100, // Amount in paise
          currency: "INR",
          name: "Fund Raiser",
          description: "Payment for Fundraiser",
          order_id,
          handler: async function (response) {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

            try {

              const verifyResponse = await axios.post(
                'http://localhost:5000/verify', // Update with correct endpoint
                {
                  razorpay_order_id,
                  razorpay_payment_id,
                  razorpay_signature,
                  amount: amount,
                  fundId: localStorage.getItem('selectedFundId'), // Replace with actual Fund ID
                  userId: localStorage.getItem('userId'), // Replace with actual User ID
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Pass token in Authorization header
                  },
                }
              );
              console.log(verifyResponse.data);
              setPaymentStatus(verifyResponse.data.message); // Display success message
            } catch (error) {
              console.error("Payment verification failed:", error);
              setPaymentStatus("Payment verification failed. Please try again.");
            }
          },
          prefill: {
            name: 'User Name',
            email: 'user@example.com',
            contact: '9876543210',
          },
          theme: {
            color: '#F37254',
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open(); // Open Razorpay checkout modal
      }
    } catch (error) {
      console.error('Error creating payment order:', error);
      setPaymentStatus("Error creating payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Donate Now</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing Payment...' : 'Pay Now'}
      </button>

      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default PaymentComponent;
