import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
const FormSubmission = ({ activeSection, setActivesection }) => {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    funds: '',
    raised: 0,
    date: '',
    type: 'Medicine',
    user_id: ''
  });
  const handleBack = () => {
    setActivesection('');
  }
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, user_id: storedUserId }));
    } else {
      console.error('User not authenticated');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);

      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.post('http://localhost:5000/raise', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Data submitted successfully:', response.data);
      alert('Form submitted successfully!');

      setFormData({
        title: '',
        details: '',
        funds: '',
        raised: 0,
        date: '',
        type: 'Medicine',
        user_id: localStorage.getItem('userId'),
      });

      setActivesection('doc');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.response?.data?.msg || 'Form submission failed. Please try again.');
    }
  };

  return (
    <div className="form-container max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg mt-12">
      {/* Back Button */}
      <button onClick={handleBack} className="text-teal-500 hover:text-teal-700 transition duration-150 mb-4">
        <FaArrowLeft size={20} />
      </button>

      {/* Heading */}
      <h2 className="text-3xl font-semibold text-gray-700 mb-3">Start a Fundraiser</h2>
      <p className="text-gray-500 text-base mb-6">
        Complete the form below to share your cause and start raising funds.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Fundraiser Title */}
          <div className="form-group col-span-1 sm:col-span-2">
            <label className="block text-gray-600 font-medium mb-1">Fundraiser Title</label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              placeholder="Enter title for your fundraiser"
            />
          </div>

          {/* Category Select */}
          <div className="form-group">
            <label className="block text-gray-600 font-medium mb-1">Category</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
            >
              <option value="Medicine">Medicine</option>
              <option value="Education">Education</option>
              <option value="Relief Fund">Relief Fund</option>
            </select>
          </div>

          {/* Goal Amount */}
          <div className="form-group">
            <label className="block text-gray-600 font-medium mb-1">Goal Amount (₹)</label>
            <input
              name="funds"
              type="number"
              value={formData.funds}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              placeholder="Set a target amount"
            />
          </div>

          {/* Details */}
          <div className="form-group col-span-1 sm:col-span-2">
            <label className="block text-gray-600 font-medium mb-1">Details</label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              placeholder="Provide a brief description of the fundraiser and why support is needed."
              rows="4"
            />
          </div>

          {/* End Date */}
          <div className="form-group">
            <label className="block text-gray-600 font-medium mb-1">Fundraiser End Date</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
            />
            <p className="text-gray-400 text-xs mt-2">Your fundraiser will close on this date.</p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out transform hover:scale-105 mt-4"
        >
          Launch Fundraiser
        </button>
      </form>
    </div>


  );
};

export default FormSubmission;
