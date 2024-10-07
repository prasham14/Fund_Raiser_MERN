import React, { useState } from 'react';
import axios from 'axios';
const CreateInitiative = () => {
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [date, setDate] = useState('');
  const [desc, setDesc] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('purpose', purpose);
    formData.append('date', date);
    formData.append('desc', desc);
    formData.append('email', email);
    formData.append('phone', phone);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/createInitiative', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Data submitted successfully:', response.data);
      // alert('Form submitted successfully!');

      setTitle('');
      setPurpose('');
      setDate('');
      setDesc('');
      setEmail('');
      setPhone('');
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
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Purpose:</label>
          <textarea
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>


        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Validation Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Your Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Contact Number(Optional)</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
