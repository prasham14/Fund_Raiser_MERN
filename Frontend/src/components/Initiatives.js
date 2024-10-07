import React from 'react';
import { useState } from 'react';
import CreateInitiative from './CreateInitiative';

const Initiatives = () => {
  const [activeSection, setActivesection] = useState(null);
  function handleButton() {
    setActivesection('createInitiatives');
  }
  const renderContent = () => {
    switch (activeSection) {
      case 'createInitiatives':
        return (
          <div>
            <CreateInitiative />
          </div>
        )
    }
  }

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
    <div className="min-h-screen bg-gray-100 py-8 pl-16 pr-8">
      {/* Title */}
      <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">
        Here are the most popular Initiatives in India!
      </h1>

      {/* Grid Container */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        {links.map(link => (
          <div key={link.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <img src={link.image} alt={link.title} className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <a href={link.url} target="_blank" rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-500 hover:text-blue-700">
                {link.title}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Button Section */}
      <div className="text-center mt-12">
        <button onClick={handleButton} className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
          Create your own Initiative
        </button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default Initiatives;
