import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const FormSubmission = ({ activeSection, setActivesection }) => {
  const [formData, setFormData] = useState({
    title: '',
    details: '',
    funds: '',
    raised: 0,
    date: '',
    type: 'Medicine',
    phone: '',
    user_id: ''
  });
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleBack = () => {
    setActivesection('');
  };

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

    const currentDate = new Date();
    const selectedDate = new Date(formData.date);

    if (selectedDate < currentDate) {
      alert("The end date cannot be in the past. Please select a valid future date.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      // Submit fundraiser form data
      const fundResponse = await axios.post('http://localhost:5000/raise', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const fundId = fundResponse.data._id;
      localStorage.setItem('fundId', fundId);

      // If a document file is selected, upload it
      if (file) {
        const documentData = new FormData();
        documentData.append("title", title);
        documentData.append("file", file);
        documentData.append('userId', formData.user_id);
        documentData.append('fundId', fundId);


        const docResponse = await axios.post(
          `http://localhost:5000/upload-files/${formData.user_id}`,
          documentData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (docResponse.data.status === "ok") {
          alert("Fundraiser and document uploaded successfully!");
        } else {
          alert("Fundraiser created, but document upload failed.");
        }
      } else {
        alert("Fundraiser created successfully!");
      }

      // Reset form data
      setFormData({
        title: '',
        details: '',
        funds: '',
        raised: 0,
        date: '',
        type: 'Medicine',
        phone: '',
        user_id: localStorage.getItem('userId')
      });
      setTitle("");
      setFile(null);
      alert("Fund Raised Successfully")
      setActivesection('');
    } catch (error) {
      console.error('Error during submission:', error);
      alert(error.response?.data?.msg || 'Submission failed. Please try again.');
    }
  };

  return (
    <div
      className="form-container max-w-3xl mx-auto bg-white p-6 shadow-lg shadow-teal-400 mt-12 overflow-y-auto no-scrollbar rounded-lg border border-teal-300"
      style={{ maxHeight: '80vh' }}
    >
      {/* Top Bar */}
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
          <div>


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

            <div className="form-group col-span-1 sm:col-span-2">
              <label className="block text-gray-600 font-medium mb-1">
                Phone Number
              </label>
              <input
                name="phone"
                type="number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-200"
                placeholder="Enter phone number of the fundRaiser"
              />
            </div>


          </div>

          <div >
            <div className='flex gap-6'>
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
                  <option value="Others">Others</option>
                </select>
              </div>

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
            </div>

            <div className="flex justify-between items-center col-span-1 sm:col-span-2">
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
            </div>

          </div>


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


        </div>

        {/* Document Title */}
        <input
          type="text"
          className="form-control w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5"
          placeholder="Document Title (e.g., Medical Certificate)"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* File Upload */}
        <input
          type="file"
          className="form-control w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5 mb-5"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-teal-500 text-white font-medium rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out transform hover:scale-105 mt-4 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          Submit Fundraiser
        </button>
      </form>
    </div>
  );
};

export default FormSubmission;
