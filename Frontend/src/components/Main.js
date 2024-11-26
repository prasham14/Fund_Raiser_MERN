import React from 'react';
import image from './images/images.jpeg';
import { useNavigate } from 'react-router-dom';

const Main = ({ isLoggedIn, setActivesection }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  };
  const handleImage1 = () => {
    setActivesection('form')
  }
  const handlePersonalDetails = () => {
    setActivesection('seeDetails')
  }
  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return (
    <div className="main-content flex flex-col items-center justify-center min-h-screen bg-white px-6 py-10">
      <div className="text-center max-w-3xl mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-teal-600 mb-4">
          Fundraising, Simplified
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Create your fundraiser and rally support for your cause in just a few steps. Empower your community to make a difference.
        </p>
        {isLoggedIn ? (
          <div className="flex flex-col items-center space-y-4">
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

      {/* Slider Section */}
      <div className="w-full max-w-4xl overflow-hidden mt-10">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-80 h-64 bg-gray-200 rounded-lg overflow-hidden shadow-lg snap-center"
            >
              <img
                src={`./images/-${index}.jpg`} // replace with actual image paths
                alt={`Slide ${index}`}
                className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
