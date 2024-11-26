import React from 'react';
import { FaArrowLeft } from "react-icons/fa";

const NGO = ({ setActivesection }) => {
  const handleBack = () => {
    setActivesection('')
  }
  const links = [
    {
      id: 1,
      title: "Smile Foundaton",
      image: "https://images.app.goo.gl/hfzieoQc7jVQBsV77",
      url: "https://www.smilefoundationindia.org/"
    },
    {
      id: 2,
      title: "CRY (Child Rights and You)",
      image: "https://example.com/startup-india.jpg",
      url: "https://www.cry.org/"
    },
    {
      id: 3,
      title: "Give India Foundation  ",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://www.giveindia.org/"
    },
    {
      id: 4,
      title: "Goonj",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://goonj.org/"
    },
    {
      id: 5,
      title: "Nanhi Kali ",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://www.nanhikali.org/"
    },
    {
      id: 6,
      title: "Care India",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://careifoundation.org/"
    },
    {
      id: 7,
      title: "Helpage India",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://www.helpageindia.org/"
    },
    {
      id: 8,
      title: "Pratham",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://www.pratham.org/"
    },
    {
      id: 9,
      title: "Akshaya Patra Foundation",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://www.akshayapatra.org/"
    },
    {
      id: 10,
      title: "	Save the Children India",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://balrakshabharat.org/"
    },
    // Add more initiatives as needed
  ];


  return (
    <div className="min-h-screen bg-gradient-to-r from-[#cbeee9] to-[#f0f8f8] py-12 px-6 lg:px-16">
      {/* Title */}
      <button onClick={handleBack}><FaArrowLeft /></button>
      <h1 className="text-center text-4xl font-bold text-teal-700 mb-12">
        Here are the Most Popular NGOs and Foundations in India!
      </h1>

      {/* Grid Container */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="relative group bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
          >
            <img
              src={link.image}
              alt={link.title}
              className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="p-6 text-center">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                {link.title}
              </a>
            </div>
            {/* Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-800 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default NGO;
