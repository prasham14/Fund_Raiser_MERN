import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Initiatives = ({ activeSection, setActivesection }) => {
  const [initiatives, setInitiatives] = useState([]);
  const navigate = useNavigate();
  function handleButton() {
    setActivesection('createInitiatives');
  }
  const token = localStorage.getItem('token');
  useEffect(() => {

    const fetchFunds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getinitiatives', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setInitiatives(response.data);
      } catch (error) {
        console.error('Error fetching education funds', error);
      }
    };

    fetchFunds();
  }, [token]);
  const links = [
    {
      id: 1,
      title: "Digital India",
      image: "https://example.com/digital-india.jpg",
      url: ""
    },
    {
      id: 2,
      title: "Startup India",
      image: "https://example.com/startup-india.jpg",
      url: ""
    },
    {
      id: 3,
      title: "Swachh Bharat",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://swachhbharat.mygov.in/"
    },
    {
      id: 4,
      title: "Make in India",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://swachhbharat.mygov.in/"
    },
    {
      id: 5,
      title: "NITI Aayog: Transforming India’s Development Agenda",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://swachhbharat.mygov.in/"
    },
    {
      id: 6,
      title: "Pradhan Mantri Jan Dhan Yojana",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://swachhbharat.mygov.in/"
    },
  ];


  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-100 py-4 px-8">
      {/* Title */}
      {/* Button Section */}
      <div className="text-center mt-10">
        <button
          onClick={handleButton}
          className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        >
          Create your own Initiative
        </button>
      </div>
      <h1 className="text-center text-3xl font-bold text-blue-600 mb-8">
        Here are the most popular Initiatives in India!
      </h1>

      {/* Grid Container */}
      <div
        className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 200px)' }}
      >
        {links.map(link => (
          <div
            key={link.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img src={link.image} alt={link.title} className="w-full h-40 object-cover" />
            <div className="p-4 text-center">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-500 hover:text-blue-700"
              >
                {link.title}
              </a>
            </div>
          </div>
        ))}

        {/* User Initiatives Section */}
        <div className="funds-container max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md col-span-full">
          <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
            Some Initiatives Created by Users
          </h2>

          <ul className="funds-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.length > 0 ? (
              initiatives.map((ini, index) => (
                <li
                  key={index}
                  className="fund-card bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300"
                >
                  <h3 className="fund-title text-2xl font-semibold text-gray-800 mb-4">
                    {ini.title}
                  </h3>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600">
                      <strong>Purpose:</strong>
                    </p>
                    <p className="text-gray-700">{ini.purpose}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600">
                      <strong>Description:</strong>
                    </p>
                    <p className="text-gray-700">{ini.desc}</p>
                  </div>

                  <h6 className="text-xl font-semibold text-gray-800 mt-6 mb-4">
                    Contact Details
                  </h6>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600">
                      <strong>Email:</strong>
                    </p>
                    <p className="text-gray-700">{ini.email}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600">
                      <strong>Phone Number:</strong>
                    </p>
                    <p className="text-gray-700">+91 {ini.phone}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-600">
                      <strong>Date Created:</strong>
                    </p>
                    <p className="text-gray-700">
                      {new Date(ini.date).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-600 text-lg col-span-full">
                No initiatives found! An error occurred.
              </p>
            )}
          </ul>
        </div>
      </div>


    </div>


  );
};

export default Initiatives;
