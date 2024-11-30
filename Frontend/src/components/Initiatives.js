import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import CreateInitiative from './CreateInitiative';

const Initiatives = ({ setActivesection }) => {
  const location = useLocation();
  const [initiatives, setInitiatives] = useState([]);
  const [active, setActive] = useState('');
  const navigate = useNavigate();

  function handleButton() {
    setActive('createInitiative');
  }

  const handleBack = () => {
    navigate('/');
  }

  const render = () => {
    switch (active) {
      case 'createInitiative': return (<CreateInitiative />);
      default: return null;
    }
  };

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
        console.error('Error fetching initiatives', error);
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
  // const selectedinitiativeId = localStorage.getItem('selectedinitiativeId');
  // const handleJoinInitiative = async () => {
  //   try {
  //     await axios.post(`http://localhost:5000/join/${initiativeId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //   } catch (err) {
  //     console.error(err);
  //     alert('Join failed, internal server error');
  //   }
  // }
  return (
    <div className="relative h-screen w-screen bg-gradient-to-b from-white to-gray-100 py-8 px-6 shadow-xl overflow-y-auto">
      {/* Top Bar with Back Button and Create Initiative */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleBack}
          className="flex items-center text-teal-700 hover:text-teal-800 text-xl transition-transform transform hover:scale-110"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>

        <button
          onClick={handleButton}
          className="flex items-center justify-center bg-gradient-to-r from-teal-700 to-teal-600 text-white p-4 rounded-full shadow-md hover:from-teal-800 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300"
          aria-label="Create Initiative"
        >
          <FaPlus className="text-xl" />
        </button>
      </div>

      <h1 className="text-center text-4xl font-extrabold text-teal-700 mb-10">
        Most Popular Initiatives in India!
      </h1>

      {/* Popular Initiatives Section */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl"
          >
            <img
              src={link.image}
              alt={link.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-5 text-center">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-teal-700 hover:text-teal-900 transition-colors duration-300"
              >
                {link.title}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* User Initiatives Section */}
      <div className="funds-container max-w-7xl mx-auto p-8 mt-12 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-teal-700">
          Initiatives Created by Users
        </h2>

        <ul className="funds-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {initiatives.length > 0 ? (
            initiatives.map((ini, index) => (
              <li
                key={index}
                className="fund-card bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1"
              >
                <h3 className="fund-title text-2xl text-center text-teal-700 underline font-semibold mb-3">
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

                <h6 className="text-xl font-semibold text-gray-800 mt-4 mb-3">
                  Contact Details
                </h6>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-600">
                    <strong>Email:</strong>
                  </p>
                  <p className="text-gray-700">{ini.email}</p>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-600">
                    <strong>Phone Number:</strong>
                  </p>
                  <p className="text-gray-700">+91 {ini.phone}</p>
                </div>

                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-600">
                    <strong>Date Created:</strong>
                  </p>
                  <p className="text-gray-700">
                    {new Date(ini.date).toLocaleDateString()}
                  </p>
                </div>
                {/* <button onClick={
                  handleJoinInitiative
                }>
                  Join
                </button> */}
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg col-span-full">
              No initiatives found! An error occurred.
            </p>
          )}
        </ul>
      </div>

      {/* Render modal content */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center ${active === 'createInitiative' ? 'block' : 'hidden'}`}>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          {render()}
        </div>
      </div>
    </div>
  );
};

export default Initiatives;
