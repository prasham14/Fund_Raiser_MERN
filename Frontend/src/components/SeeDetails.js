// src/UserDetailsForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ImCross } from "react-icons/im";

const UserDetailsForm = ({ setActivesection }) => {
  const [userDetails, setUserDetails] = useState({
    AccountNo: "",
    Bank: "",
    AdhaarNo: "",
    Address: "",
    mobileNo: "",
    Upi: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/user-details/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      .then((response) => {
        if (response.data) {
          setUserDetails(response.data);
          setIsEditing(true);

        }
      })
      .catch((error) => console.error("Error fetching user details:", error));
  }, [userId]);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/user-details",
        { userId, ...userDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((response) => {
        alert(response.data.message);
      })
      .catch((error) => {
        console.error("Error saving user details:", error);
        alert("An error occurred while saving data");
      });
  };
  const handleBack = () => {
    setActivesection('')
      ;
  }
  return (
    <div className="w-[50vh] max-h-[500px] p-3 bg-white shadow-lg rounded-lg mt-8 overflow-y-auto no-scrollbar">
      <h2 className="text-xl font-bold mb-3 text-center text-gray-800">
        <div  >
          <button onClick={handleBack}>
            <ImCross />

          </button>
        </div>
        {isEditing ? "Update Your Details" : "Enter Your Details"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm">
            Account Number:
          </label>
          <input
            type="number"
            name="AccountNo"
            value={userDetails.AccountNo}
            onChange={handleChange}
            required
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Enter your account number"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm">
            Bank Name:
          </label>
          <input
            type="text"
            name="Bank"
            value={userDetails.Bank}
            onChange={handleChange}
            required
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Enter your bank name"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm">
            Aadhaar Number:
          </label>
          <input
            type="number"
            name="AdhaarNo"
            value={userDetails.AdhaarNo}
            onChange={handleChange}
            required
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Enter your Aadhaar number"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm">
            Address:
          </label>
          <input
            type="text"
            name="Address"
            value={userDetails.Address}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Enter your address"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm">
            Mobile Number:
          </label>
          <input
            type="text"
            name="mobileNo"
            value={userDetails.mobileNo}
            onChange={handleChange}
            required
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Enter your mobile number"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1 text-sm">
            UPI ID:
          </label>
          <input
            type="text"
            name="Upi"
            value={userDetails.Upi}
            onChange={handleChange}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Enter your UPI ID"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 mt-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          {isEditing ? "Update Details" : "Submit Details"}
        </button>
      </form>
    </div>

  );
};

export default UserDetailsForm;
