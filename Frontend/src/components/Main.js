import React from 'react';
import image from './images/images.jpeg';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  function handleCLick() {
    navigate('/signup')
  }
  return (
    <div>
      {/* Main content container */}
      <div className="main-content flex-1 mt-16 p-12 bg-gradient-to-b from-teal-100 to-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          {/* Headline */}
          <h1 className="text-5xl font-extrabold text-teal-600 mb-4">
            Fundraising Made Simple
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            Start a fundraiser today and rally support from your community.
          </p>

          {/* CTA Button */}
          <button onClick={handleCLick} className="bg-teal-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out mb-12">
            Get Started
          </button>

          {/* Image Grid */}
          <div className="image-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Image 1 */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <img
                src={image}
                alt="Fundraiser"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 ease-in-out"></div>
              <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <p className="text-lg font-bold">Create Your Fundraiser</p>
              </div>
            </div>

            {/* Image 2 */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <img
                src={image}
                alt="Community Support"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 ease-in-out"></div>
              <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <p className="text-lg font-bold">Get Community Support</p>
              </div>
            </div>

            {/* Image 3 */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <img
                src={image}
                alt="Charity Event"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 ease-in-out"></div>
              <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <p className="text-lg font-bold">Host a Charity Event</p>
              </div>
            </div>

            {/* Image 4 */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <img
                src={image}
                alt="Fundraising Platform"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 ease-in-out"></div>
              <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <p className="text-lg font-bold">Use Our Platform</p>
              </div>
            </div>

            {/* Image 5 */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <img
                src={image}
                alt="Support NGOs"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 ease-in-out"></div>
              <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <p className="text-lg font-bold">Support NGOs</p>
              </div>
            </div>

            {/* Image 6 */}
            <div className="relative group overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <img
                src={image}
                alt="Fundraiser Success"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 ease-in-out"></div>
              <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <p className="text-lg font-bold">Achieve Your Goals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
