import React, { useState, useEffect } from 'react';
import axios from 'axios';
const FormSubmission = ({ setActivesection }) => {
  const [formData, setFormData] = useState({
    title: '',
    purpose: '',
    desc: '',
    date: Date.now(),
    phone: '',
    email: ''
  });
  const emailId = localStorage.getItem('email');
  useEffect(() => {
    // const storedUserId = localStorage.getItem('userId');

    if (emailId) {
      setFormData((prevData) => ({ ...prevData, email: emailId }));
    } else {
      console.error('User not authenticated');
    }
  }, [emailId]);

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
      const response = await axios.post(`http://localhost:5000/createInitiative/${emailId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // localStorage.setItem('initiativeId', response._id);
      console.log('Data submitted successfully:', response.data);
      alert('Initiative Created!')
      setFormData({
        title: '',
        purpose: '',
        desc: '',
        date: '',
        phone: '',
        email: localStorage.getItem('email')
      });

      setActivesection('');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.response?.data?.msg || 'Form submission failed. Please try again.');
    }
  };

  return (
    <div className="form-container max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="form-heading text-2xl font-bold text-gray-800 mb-6">Fill this form to create an Initiative</h2>
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
          <label className="block text-gray-700 font-semibold mb-1">Purpose:</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Description:</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Phone Number</label>
          <input
            name="phone"
            type="number"
            value={formData.phone}
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
