import React from 'react';
import med from "./images/medicines.jpeg";
import rf from "./images/relief.png";
import ed from "./images/education.jpg";
import { FaArrowLeft } from "react-icons/fa";

const ViewFundRaiser = ({ setActivesection }) => {
  const handleCategoryClick = (category) => {
    setActivesection(category);
  };
  const handleBack = () => {
    setActivesection('');
  };

  return (
    <div className="donate-container max-w-5xl mx-auto p-8 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-lg">
      <button onClick={handleBack} className="mb-4">
        <FaArrowLeft />
      </button>
      <h1 className="donate-title text-4xl font-bold text-center mb-4 text-gray-900">
        What type of Funds would you like to donate?
      </h1>
      <p className="donate-subtitle text-lg text-center mb-8 text-gray-600">
        We currently have three categories of funds. Choose one to make an impact.
      </p>

      {/* Categories */}
      <ul className="donate-options flex flex-row gap-8 justify-center">
        <li
          className="donate-option bg-white shadow-lg rounded-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          onClick={() => handleCategoryClick('option1')}
        >
          <div className="donate-link block p-8 text-center cursor-pointer">
            <img
              src={ed}
              alt="Education"
              className="option-image w-24 h-24 mx-auto mb-6 rounded-full border-4 border-blue-100 hover:border-blue-200 transition-all duration-200"
            />
            <span className="option-text text-2xl font-semibold text-gray-800">
              Education
            </span>
            <p className="text-gray-500 text-sm mt-2">Support education initiatives to empower future generations.</p>
          </div>
        </li>

        <li
          className="donate-option bg-white shadow-lg rounded-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          onClick={() => handleCategoryClick('option2')}
        >
          <div className="donate-link block p-8 text-center cursor-pointer">
            <img
              src={rf}
              alt="Relief Funds"
              className="option-image w-24 h-24 mx-auto mb-6 rounded-full border-4 border-blue-100 hover:border-blue-200 transition-all duration-200"
            />
            <span className="option-text text-2xl font-semibold text-gray-800">
              Relief Funds
            </span>
            <p className="text-gray-500 text-sm mt-2">Aid communities affected by natural disasters and emergencies.</p>
          </div>
        </li>

        <li
          className="donate-option bg-white shadow-lg rounded-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          onClick={() => handleCategoryClick('option3')}
        >
          <div className="donate-link block p-8 text-center cursor-pointer">
            <img
              src={med}
              alt="Medicines"
              className="option-image w-24 h-24 mx-auto mb-6 rounded-full border-4 border-blue-100 hover:border-blue-200 transition-all duration-200"
            />
            <span className="option-text text-2xl font-semibold text-gray-800">
              Medicines
            </span>
            <p className="text-gray-500 text-sm mt-2">Provide essential medicines to those in need of healthcare support.</p>
          </div>
        </li>

        <li
          className="donate-option bg-white shadow-lg rounded-lg transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
          onClick={() => handleCategoryClick('others')}
        >
          <div className="donate-link block p-8 text-center cursor-pointer">
            <img
              src={med}
              alt="Others"
              className="option-image w-24 h-24 mx-auto mb-6 rounded-full border-4 border-blue-100 hover:border-blue-200 transition-all duration-200"
            />
            <span className="option-text text-2xl font-semibold text-gray-800">
              Others
            </span>
            <p className="text-gray-500 text-sm mt-2">Other Funds including charity else</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ViewFundRaiser;
