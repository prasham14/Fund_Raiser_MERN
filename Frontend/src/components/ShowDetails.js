import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowDetails = ({ setActivesection }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5000/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        alert('Failed to fetch user details.');
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    setActivesection('seeDetails');
  };

  return (
    <div className="details-container max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      {userData ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Details</h2>
          <p><strong>Adhaar Number:</strong> {userData.AdhaarNo}</p>
          <p><strong>Bank Name:</strong> {userData.Bank}</p>
          <p><strong>Account Number:</strong> {userData.AccountNo}</p>
          <p><strong>Address:</strong> {userData.Address}</p>
          <p><strong>Mobile Number:</strong> {userData.mobileNo}</p>
          <p><strong>UPI ID:</strong> {userData.Upi || 'Not provided'}</p>
          <button onClick={handleEdit} className="mt-4 w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600">
            Edit
          </button>
        </>
      ) : (
        <p>Loading your details...</p>
      )}
    </div>
  );
};

export default ShowDetails;
