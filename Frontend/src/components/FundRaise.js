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
    <div className="form-container max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <button onClick={handleBack}> <FaArrowLeft /></button>

      <h2 className="form-heading text-2xl font-bold text-gray-800 mb-6">Fill this form to raise a fund</h2>
      <form onSubmit={handleSubmit} className="form space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Title:</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            id="type"
          >
            <option value="Medicine">Medicine</option>
            <option value="Education">Education</option>
            <option value="Relief Fund">Relief Fund</option>
          </select>
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Details:</label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Funds (Amount Requested):</label>
          <input
            name="funds"
            type="number"
            value={formData.funds}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Raised (if raised):</label>
          <input
            name="raised"
            type="number"
            value={formData.raised}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Validation Date:(The FundRaiser will be expired after this date)</label>
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button type="submit" className="form-button w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-200">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormSubmission;
