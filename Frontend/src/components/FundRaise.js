import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
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
    // navigate('/');
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
      // alert('Form submitted successfully!');

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
    <div
      className="form-container max-w-lg mx-auto bg-white p-6 shadow-lg mt-12 overflow-y-auto no-scrollbar rounded-lg border border-gray-200"
      style={{ maxHeight: '80vh' }}
    >
      {/* Top Bar: Back Button and Heading */}
      <div className="relative mb-3">
        <button
          onClick={handleBack}
          className="absolute right-0 top-0 text-teal-500 hover:text-teal-700 transition duration-150 flex items-center space-x-2"
        >
          <ImCross size={20} />
        </button>
        <h2 className="text-3xl font-semibold text-gray-700 text-center">
          Start a Fundraiser
        </h2>
      </div>

      <p className="text-gray-500 text-base mb-3 text-center">
        Complete the form below to share your cause and start raising funds.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Fundraiser Title */}
          <div className="form-group col-span-1 sm:col-span-2">
            <label className="block text-gray-600 font-medium mb-1">
              Fundraiser Title
            </label>
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
            <label className="block text-gray-600 font-medium mb-1">
              Goal Amount (₹)
            </label>
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

          {/* Flexbox for End Date and Enter Document Button */}
          <div className="flex justify-between items-center col-span-1 sm:col-span-2">
            {/* Fundraiser End Date */}
            <div className="w-2/3">
              <label className="block text-gray-600 font-medium mb-1">
                Fundraiser End Date
              </label>
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
              />
              <p className="text-gray-400 text-xs mt-2">
                Your fundraiser will close on this date.
              </p>
            </div>

            {/* Enter Document Button */}
            <div className="w-1/3 ml-4">
              <button
                type="button"
                onClick={() => { setActivesection('doc') }}
                className="w-full py-3 bg-slate-500 text-black font-medium rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                Enter Document
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out transform hover:scale-105 mt-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Launch Fundraiser
        </button>
      </form>
    </div>



  );
};

export default FormSubmission;
