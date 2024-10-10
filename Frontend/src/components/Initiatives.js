import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Initiatives = ({ activeSection, setActivesection }) => {
  const [funds, setFunds] = useState([]);
  const navigate = useNavigate();
  function handleButton() {
    setActivesection('createInitiatives');
  }
  useEffect(() => {

    const fetchFunds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getinitiatives');
        setFunds(response.data);
      } catch (error) {
        console.error('Error fetching education funds', error);
      }
    };

    fetchFunds();
  }, []);
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
    // Add more initiatives as needed
  ];


  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-100 py-4 pl-16 pr-8">
      {/* Title */}
      <h1 className="text-center text-3xl font-bold text-blue-600 mb-6">
        Here are the most popular Initiatives in India!
      </h1>

      {/* Grid Container */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {links.map(link => (
          <div key={link.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <img src={link.image} alt={link.title} className="w-full h-40 object-cover" />
            <div className="p-4 text-center">
              <a href={link.url} target="_blank" rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-500 hover:text-blue-700">
                {link.title}
              </a>

            </div>


          </div>

        ))}

        <div>
          <h1>
            Some Initiatives created by users
          </h1>
          <ul className="funds-list">
            {funds.length > 0 ? (
              funds.map((ini, index) => (
                <li key={index} className="fund-card">
                  <h2 className="fund-title">{ini.title}</h2>
                  <p><strong>Purpose:</strong> {ini.purpose}</p>
                  <p><strong>Date Created:</strong> {new Date(ini.date).toLocaleDateString()}</p>
                  <p><strong>Description:</strong> ${ini.desc}</p>
                  <h6>Contact Details</h6>
                  <p><strong>Email:</strong> ${ini.email}</p>
                  <p><strong>Phone Number:</strong> ${ini.phone}</p>

                </li>
              ))
            ) : (
              <p></p>
            )}
          </ul>
        </div>
      </div>

      {/* Button Section */}
      <div className="text-center mt-8">
        <button onClick={handleButton} className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
          Create your own Initiative
        </button>
      </div>
    </div>

  );
};

export default Initiatives;
