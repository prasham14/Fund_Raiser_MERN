import React from 'react';
import image from './images/images.jpeg';
import { useNavigate } from 'react-router-dom';

const Main = ({ isLoggedIn, setActivesection }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  };

  isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return (
    <div className="main-content flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-gray-50 px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl font-extrabold text-teal-600 mb-6">
          Fundraising, Simplified
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Create your fundraiser and rally support for your cause in just a few steps. Empower your community to make a difference.
        </p>
        {
          isLoggedIn ? (<div></div>) : (<button
            onClick={handleClick}
            className="bg-teal-500 text-white py-3 px-10 rounded-full shadow-md hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started Now
          </button>)
        }

      </div>

      <div className="flex flex-col sm:flex-row justify-center mt-16 gap-8">
        {/* Image 1 */}
        <div className="relative group overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-96 cursor-pointer">
          <button onClick={() => { setActivesection('form') }}>
            <img
              src={image}
              alt="Create Fundraiser"
              className="w-full h-full object-cover"
            />
          </button>

          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-lg font-bold">Create a Fundraiser</p>
          </div>
        </div>

        {/* Image 2 */}
        <div className="relative group overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-96">
          <button onClick={() => { setActivesection('viewFundRaiser') }}>
            <img
              src={image}
              alt="Community Support"
              className="w-full h-full object-cover"
            />
          </button>

          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-lg font-bold">Get Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
