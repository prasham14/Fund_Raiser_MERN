import React, { useState } from 'react';

const Donate = () => {
  const [amount, setAmount] = useState(500); // Default donation amount in paise

  const handlePayment = async () => {
    // Step 1: Create an order
    const response = await fetch('http://localhost:5000/api/auth/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }), // Amount is in paise
    });

    const orderData = await response.json();

    // Step 2: Set up Razorpay options
    const options = {
      key: '111', // Replace with your Razorpay key ID
      amount: orderData.amount,
      currency: 'INR',
      name: 'Fundraiser Donation',
      description: 'Thank you for your donation!',
      order_id: orderData.id, // Use the order ID generated from the server
      handler: async function (response) {
        // Verify the payment on your server
        const verificationResponse = await fetch('http://localhost:5000/api/auth/verify-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });

        const verificationData = await verificationResponse.json();
        if (verificationData.success) {
          alert('Payment Successful!');
        } else {
          alert('Payment Verification Failed');
        }
      },
      prefill: {
        name: 'Donor Name',
        email: 'donor@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#F37254',
      },
    };

    // Open Razorpay payment modal
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="donation-form">
      <h1 className="text-3xl font-bold">Donate to the Fundraiser</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Donation Amount (₹)</label>
        <input
          type="number"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
          value={amount / 100} // Display amount in rupees
          onChange={(e) => setAmount(e.target.value * 100)} // Convert to paise
        />
      </div>
      <button
        onClick={handlePayment}
        className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-200"
      >
        Donate Now
      </button>
    </div>
  );
};

export default Donate;
