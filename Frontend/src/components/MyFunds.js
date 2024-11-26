import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const MyFunds = () => {
  const [funds, setFunds] = useState([]);
  const [editInitiativeId, setEditInitiativeId] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    details: '',
    funds: '',
    raised: '',
    date: '',
    type: 'Medicine',
    user_id: ''
  });
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/')
  }
  const userId = localStorage.getItem('userId'); // Store user_id in localStorage or pass it as a prop
  const token = localStorage.getItem('token');

  function handleButton() {

  }

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getFunds/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFunds(response.data);
      } catch (error) {
        console.error('Error fetching funds', error);
      }
    };

    fetchFunds();
  }, [userId, token]);

  const handleEditClick = (fund) => {
    setEditInitiativeId(fund._id); // Assuming each fund has a unique `_id` field
    setEditData({
      title: fund.title,
      details: fund.details,
      funds: fund.funds,
      raised: fund.raised,
      date: fund.date,
      type: fund.type,
      user_id: fund.user_id
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/editFund/${editInitiativeId}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditInitiativeId(null); // Close edit form on success

      // Update local funds list with updated fund data
      setFunds((prevFunds) =>
        prevFunds.map((fund) =>
          fund._id === editInitiativeId ? { ...fund, ...editData } : fund
        )
      );
    } catch (err) {
      console.error(err);
      alert('Edit failed, internal server error');
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 lg:px-12 overflow-y-auto no-scrollbar">
      <button onClick={handleBack}><FaArrowLeft /></button>

      {/* Raise Funds Button (Top Left) */}
      {/* <div className="flex justify-start mb-6">
    <button
      onClick={handleButton}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
    >
      Raise More Funds
    </button>
  </div> */}

      <div className="max-w-7xl mx-auto p-8 rounded-lg shadow-lg">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
          Your Raised Funds
        </h2>

        {/* Funds List */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {funds.length > 0 ? (
            funds.map((fund, index) => (
              <li
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  {fund.title}
                </h3>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Details:</strong>
                  </p>
                  <p className="text-gray-700">{fund.details}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Funds Needed:</strong>
                  </p>
                  <p className="text-gray-700">{fund.funds}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Amount Raised:</strong>
                  </p>
                  <p className="text-gray-700">{fund.raised}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Type:</strong>
                  </p>
                  <p className="text-gray-700">{fund.type}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Validation Date:</strong>
                  </p>
                  <p className="text-gray-700">
                    {new Date(fund.date).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => handleEditClick(fund)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg col-span-full">
              No funds found!
            </p>
          )}
        </ul>

        {/* Edit Form */}
        {editInitiativeId && (
          <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-lg">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Edit Fund</h3>
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                placeholder="Title"
                className="block w-full p-4 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                name="details"
                value={editData.details}
                onChange={handleEditChange}
                placeholder="Details"
                className="block w-full p-4 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              />
              <input
                type="number"
                name="funds"
                value={editData.funds}
                onChange={handleEditChange}
                placeholder="Funds Needed"
                className="block w-full p-4 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              />
              <input
                type="number"
                name="raised"
                value={editData.raised}
                onChange={handleEditChange}
                placeholder="Amount Raised"
                className="block w-full p-4 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                name="type"
                value={editData.type}
                onChange={handleEditChange}
                placeholder="Type"
                className="block w-full p-4 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleEditSubmit}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditInitiativeId(null)}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFunds;