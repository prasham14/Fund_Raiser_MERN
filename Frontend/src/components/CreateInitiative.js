import React, { useState } from 'react';
import axios from 'axios';
const CreateInitiative = () => {
  const [formData, setFormData] = useState({
    title: '',
    purpose: '',
    date: '',
    desc: '',
    email: '',
    phone: ''

  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    try {
      console.log(formData);
      const response = await axios.post('http://localhost:5000/createInitiative', formData, { withCredentials: true });
      console.log('Data submitted successfully:', response.data);
      alert('Form submitted successfully!');

      setFormData({
        title: '',
        purpose: '',
        date: '',
        desc: '',
        email: '',
        phone: ''
      }
      );

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Form submission failed.');
    }
  };
  return (
    <div className="form-container max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="form-heading text-2xl font-bold text-gray-800 mb-6">Form Submission</h2>
      <form onSubmit={handleSubmit} className="form space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Title:</label>
          <input
            name='title'
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
            name='purpose'
            value={formData.purpose}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>


        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Validation Date:</label>
          <input
            name='date'
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Description:</label>
          <textarea
            name='desc'
            value={formData.desc}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Your Email</label>
          <input
            name='email'
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Contact Number(Optional)</label>
          <input
            name='phone'
            type="number"
            value={formData.phone}
            onChange={handleChange}
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

export default CreateInitiative;
