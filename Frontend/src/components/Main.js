import React from 'react';
import image from './images/images.jpeg';
import { useNavigate } from 'react-router-dom';
import im from './images/OIP.jpeg'
const Main = ({ isLoggedIn, setActivesection }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  };

  const handlePersonalDetails = () => {
    setActivesection('seeDetails')
  }
  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return (
    <div className="main-content flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-10">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center md:justify-between w-full max-w-7xl">
        {/* Text Section */}
        <div className="text-center md:text-left max-w-3xl mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold text-teal-600 mb-4">
            Fundraising, Simplified
          </h1>
          <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-2xl">
            Create your fundraiser and rally support for your cause in just a few steps. Empower your community to make a difference.
          </p>

          {isLoggedIn ? (
            <div className="flex flex-col items-center md:items-start space-y-4">
              <p className="text-gray-600 text-lg">
                Make sure to add your personal details so that people can reach you easily.
              </p>
              <button
                onClick={handlePersonalDetails}
                className="bg-teal-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Add Personal Details
              </button>
            </div>
          ) : (
            <button
              onClick={handleClick}
              className="bg-teal-500 text-white py-3 px-10 rounded-full shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Get Started Now
            </button>
          )}
        </div>

        {/* Image Section */}
        <div className="translate-x-0 md:translate-x-20 mb-10 md:mb-0">
          <img
            src={im}
            alt="Fundraising"
            className="h-[70vh] md:h-[90vh] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Slider Section */}
      <div className="w-full max-w-5xl overflow-hidden mt-10">
        <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-80 h-[350px] bg-gray-200 rounded-lg overflow-hidden shadow-lg snap-center transform transition-transform duration-300 ease-in-out hover:scale-105"
            >
              <img
                src={`./images/-${index}.jpg`} // replace with actual image paths
                alt={`Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* <p className="text-gray-500 dark:text-gray-400">Track work across the enterprise through an open, collaborative platform. Link issues across Jira and ingest data from other software development tools, so your IT support and operations teams have richer contextual information to rapidly respond to requests, incidents, and changes.</p> */}
      <div className="inline-flex items-center justify-center w-full my-8">
        {/* Left Line */}
        <hr className="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />

        {/* Dots */}
        <div className="flex items-center justify-center space-x-2 mx-4">
          <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
          <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
        </div>

        {/* Right Line */}
        <hr className="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
      </div>

    </div>
  );
};

export default Main;
