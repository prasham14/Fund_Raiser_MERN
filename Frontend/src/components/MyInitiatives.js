import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";

const MyInitiatives = ({ setActivesection }) => {
  const [initiatives, setInitiatives] = useState([]);
  const [editInitiativeId, setEditInitiativeId] = useState(null);
  const [editData, setEditData] = useState({ title: '', purpose: '', desc: '', phone: '' });

  const emailId = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const handleBack = () => {
    setActivesection('')
  }
  function handleButton() {
    setActivesection('createInitiatives');
  }

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getInitiative/${emailId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInitiatives(response.data);
      } catch (error) {
        console.error('Error fetching initiatives', error);
      }
    };

    fetchFunds();
  }, [emailId, token]);

  const handleEditClick = (initiative) => {
    setEditInitiativeId(initiative._id); // Assuming each initiative has a unique `_id` field
    setEditData({
      title: initiative.title,
      purpose: initiative.purpose,
      desc: initiative.desc,
      phone: initiative.phone,
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
      await axios.put(`http://localhost:5000/editInitiative/${editInitiativeId}`, editData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEditInitiativeId(null); // Close edit form on success

      // Update local initiatives list with updated initiative data
      setInitiatives((prevInitiatives) =>
        prevInitiatives.map((initiative) =>
          initiative._id === editInitiativeId ? { ...initiative, ...editData } : initiative
        )
      );
    } catch (err) {
      console.error(err);
      alert('Edit failed, internal server error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 lg:px-12">
      <button onClick={handleBack}><FaArrowLeft /></button>
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Title */}
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
          Your Initiatives
        </h2>

        {/* Initiatives List */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {initiatives.length > 0 ? (
            initiatives.map((initiative, index) => (
              <li
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                  {initiative.title}
                </h3>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Purpose:</strong>
                  </p>
                  <p className="text-gray-700">{initiative.purpose}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Description:</strong>
                  </p>
                  <p className="text-gray-700">{initiative.desc}</p>
                </div>

                <h6 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                  Contact Details
                </h6>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Email:</strong>
                  </p>
                  <p className="text-gray-700">{initiative.email}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Phone Number:</strong>
                  </p>
                  <p className="text-gray-700">+91 {initiative.phone}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Date Created:</strong>
                  </p>
                  <p className="text-gray-700">
                    {new Date(initiative.date).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => handleEditClick(initiative)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-300"
                >
                  Edit
                </button>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg col-span-full">
              No initiatives found! An error occurred.
            </p>
          )}
        </ul>

        {/* Edit Form */}
        {editInitiativeId && (
          <div className="bg-white mt-12 p-8 rounded-lg shadow-lg transition duration-300">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Edit Initiative</h3>
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
              name="purpose"
              value={editData.purpose}
              onChange={handleEditChange}
              placeholder="Purpose"
              className="block w-full p-4 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
            <textarea
              name="desc"
              value={editData.desc}
              onChange={handleEditChange}
              placeholder="Description"
              className="block w-full p-4 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              name="phone"
              value={editData.phone}
              onChange={handleEditChange}
              placeholder="Phone"
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
        )}
      </div>

      {/* Add New Initiative Button */}
      <div className="text-center mt-12">
        <button
          onClick={handleButton}
          className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300"
        >
          Create Another Initiative
        </button>
      </div>
    </div>

  );
};

export default MyInitiatives;
