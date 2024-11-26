import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import CreateInitiative from './CreateInitiative';
import { useNavigate } from 'react-router-dom';

const MyInitiatives = ({ setActivesection }) => {
  const [initiatives, setInitiatives] = useState([]);
  const [editInitiativeId, setEditInitiativeId] = useState(null);
  const [editData, setEditData] = useState({ title: '', purpose: '', desc: '', phone: '' });
  const [active, setActive] = useState('');
  const emailId = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/')
  };

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
  const render = () => {
    switch (active) {
      case 'createInitiative': return (<CreateInitiative setActive={setActive} />);
      default: return null;
    }
  };
  return (
    <div className="min-h-screen py-6 px-4 lg:px-8 overflow-y-auto no-scrollbar">
      <button
        onClick={handleBack}
        className="text-teal-700 text-2xl hover:text-teal-500 transition duration-300 mb-4"
      >
        <FaArrowLeft />
      </button>

      <div className="relative max-w-6xl mx-auto bg-white p-4 rounded-lg shadow-lg overflow-y-auto no-scrollbar h-[70vh]">
        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-teal-700 mb-6">
          Your Initiatives
        </h2>

        {/* Initiatives List */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.length > 0 ? (
            initiatives.map((initiative, index) => (
              <li
                key={index}
                className="bg-white rounded-lg shadow-md p-4 border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {initiative.title}
                </h3>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Purpose:</strong>
                  </p>
                  <p className="text-gray-600 text-sm">{initiative.purpose}</p>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Description:</strong>
                  </p>
                  <p className="text-gray-600 text-sm">{initiative.desc}</p>
                </div>

                <h6 className="text-base font-semibold text-gray-800 mt-4 mb-2">
                  Contact Details
                </h6>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Email:</strong>
                  </p>
                  <p className="text-gray-600 text-sm">{initiative.email}</p>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Phone Number:</strong>
                  </p>
                  <p className="text-gray-600 text-sm">+91 {initiative.phone}</p>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    <strong>Date Created:</strong>
                  </p>
                  <p className="text-gray-600 text-sm">
                    {new Date(initiative.date).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => handleEditClick(initiative)}
                  className="bg-teal-600 text-white px-3 py-2 rounded hover:bg-teal-700 transition duration-300 text-sm"
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

        {/* Add New Initiative Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setActive('createInitiative')}
            className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Edit Form Overlay */}
      {editInitiativeId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Edit Initiative</h3>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleEditChange}
              placeholder="Title"
              className="block w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300"
            />
            <input
              type="text"
              name="purpose"
              value={editData.purpose}
              onChange={handleEditChange}
              placeholder="Purpose"
              className="block w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300"
            />
            <textarea
              name="desc"
              value={editData.desc}
              onChange={handleEditChange}
              placeholder="Description"
              className="block w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300"
            />
            <input
              type="text"
              name="phone"
              value={editData.phone}
              onChange={handleEditChange}
              placeholder="Phone"
              className="block w-full p-3 mb-3 border border-gray-300 rounded-lg focus:ring focus:ring-teal-300"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={handleEditSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditInitiativeId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center ${active === 'createInitiative' ? 'block' : 'hidden'}`}>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          {render()}
        </div>
      </div>
    </div>
  );
};

export default MyInitiatives;
