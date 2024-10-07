import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FundRaised from './FundRaised';
const FormSubmission = ({ isFund, setIsFund }) => {
  const [title, setTitle] = useState('');
  const [purpose, setPurpose] = useState('');
  const [funds, setFunds] = useState('');
  const [raised, setRaised] = useState('');
  const [file, setFile] = useState();
  const [date, setDate] = useState('');
  const [type, setType] = useState();
  const navigate = useNavigate();

  const [activeSection, setActivesection] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const formData2 = new FormData();
    formData2.append('file', file);

    formData.append('title', title);
    formData.append('purpose', purpose);
    formData.append('funds', funds);
    formData.append('raised', raised);
    formData.append('file', file);
    formData.append('date', date);
    formData.append('type', type);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/raiseFund', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsFund(false);
      console.log('Data submitted successfully:', response.data);
      // alert('Form submitted successfully!');

      setTitle('');
      setPurpose('');
      setFunds('');
      setRaised('');
      setDocuments(null);
      setDate('');
      setType('');
      setActivesection('raised');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Form submission failed.');
    }
  };

  function upload() {
    try {
      axios.post('http://localhost:5000/api/auth/raiseFund', formData2);
    }
    catch (error) {
      console.log(error);
    }

  }

  const handleFileChange = (e) => {
    setDocuments(e.target.files[0]);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'raised':
        return (
          <div>
            <FundRaised />
          </div>
        )


    }
  }
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
          <label className='block text-gray-700 font-semibold mb-1'>Type:</label>
          <select
            onChange={(e) => setType(e.target.value)}
            className='form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500'
            id="type"
          >
            <option value="Medicine">Medicine</option>
            <option value="Education">Education</option>
            <option value="Relief Fund">Relief Fund</option>
          </select>
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
          <label className="block text-gray-700 font-semibold mb-1">Funds (Amount Requested):</label>
          <input
            type="number"
            value={funds}
            onChange={(e) => setFunds(e.target.value)}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="form-group">
          <label className="block text-gray-700 font-semibold mb-1">Raised (Funds Already Raised):</label>
          <input
            type="number"
            value={raised}
            onChange={(e) => setRaised(e.target.value)}
            required
            className="form-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="form-group">

          <form action="/api/auth/raiseFund" method="POST" enctype="multipart/form-data">
            <label className="block text-gray-700 font-semibold mb-1">Documents:</label>
            <input
              type="file"
              name="documents"
              onChange={(e) => {
                setFile(e.target.files[0])
              }}
              required
              className="form-file-input w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button type="button" onClick={{ upload }}>Upload</button>
          </form>

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

        <button type="submit" className="form-button w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-200">
          Submit
        </button>
      </form>

      <div>{renderContent()}</div>
    </div>

  );
};

export default FormSubmission;
