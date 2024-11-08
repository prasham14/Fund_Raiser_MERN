import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const SeeDetails = ({ setActivesection }) => {
  const [formData, setFormData] = useState({
    AccountNo: '',
    Bank: '',
    AdhaarNo: '',
    Address: '',
    mobileNo: '',
    Upi: '',
    user_id: ''
  });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setFormData((prevData) => ({ ...prevData, user_id: storedUserId }));
      fetchUserData(storedUserId); // Fetch data if editing existing details
    } else {
      console.error('User not authenticated');
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data) {
        setFormData(response.data);
        setIsEditMode(true);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleBack = () => setActivesection('showPersonalDetails');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/fill`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(isEditMode ? 'Data updated successfully!' : 'Data entered successfully!');
      setActivesection('showPersonalDetails');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.response?.data?.msg || 'Form submission failed. Please try again.');
    }
  };

  return (
    <div className="form-container max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <button onClick={handleBack} className="mb-4"><FaArrowLeft /></button>
      <form onSubmit={handleSubmit} className="form space-y-4">
        <h2 className="form-heading text-2xl font-bold text-gray-800 mb-6">
          {isEditMode ? 'Edit Personal Details' : 'Add Personal Details'}
        </h2>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Adhaar Number</label>
          <input name="AdhaarNo" type="number" value={formData.AdhaarNo} onChange={handleChange} required className="form-input w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Bank Name</label>
          <input name="Bank" value={formData.Bank} onChange={handleChange} required className="form-input w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Account Number</label>
          <input name="AccountNo" type="number" value={formData.AccountNo} onChange={handleChange} required className="form-input w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Address</label>
          <input name="Address" value={formData.Address} onChange={handleChange} required className="form-input w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Mobile Number</label>
          <input name="mobileNo" type="number" value={formData.mobileNo} onChange={handleChange} required className="form-input w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">UPI ID (optional)</label>
          <input name="Upi" value={formData.Upi} onChange={handleChange} className="form-input w-full p-2 border border-gray-300 rounded-lg" />
        </div>
        <button type="submit" className="form-button w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600">
          {isEditMode ? 'Save Changes' : 'Add Details'}
        </button>
      </form>
    </div>
  );
};

export default SeeDetails;
