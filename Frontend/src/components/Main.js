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
    <div className="main-content flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#cbeee9] to-[#f0f8f8] px-6 py-10">
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-5xl md:text-5xl font-extrabold text-teal-500 mb-4">
          Fundraising, Simplified
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          Create your fundraiser and rally support for your cause in just a few steps. Empower your community to make a difference.
        </p>
        {isLoggedIn ? (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-gray-600">
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

      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-10">
        {/* Card 1 */}
        <div className="relative group overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-full sm:w-80">
          <button onClick={handleImage1}>
            <img
              src={image}
              alt="Create Fundraiser"
              className="w-full h-full object-cover"
            />
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-xl font-semibold">Create a Fundraiser</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative group overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 w-full sm:w-80">
          <button onClick={() => setActivesection('viewFundRaiser')}>
            <img
              src={image}
              alt="Community Support"
              className="w-full h-full object-cover"
            />
          </button>
          <div className="absolute inset-0 bg-gradient-to-t from-black opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-xl font-semibold">Get Support</p>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Main;
