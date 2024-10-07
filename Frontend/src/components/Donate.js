import React from 'react';
import { Link } from "react-router-dom";
import med from "./images/medicines.jpeg"
import rf from "./images/relief.png"
import ed from "./images/education.jpg"
const Donate = () => {
  return (
    <div className="donate-container max-w-7xl mx-auto p-6">
      <h1 className="donate-title text-4xl font-bold text-center mb-6 text-gray-800">
        What kind of fundraiser are you looking for?
      </h1>
      <p className="donate-subtitle text-xl text-center mb-10 text-gray-600">
        Currently, we have three types of funds available:
      </p>

      <ul className="donate-options grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <li className="donate-option bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <Link to="/option-one" className="donate-link block p-6">
            <div className="option-content text-center">
              <img
                src={ed}
                alt="Education"
                className="option-image w-20 h-20 mx-auto mb-4"
              />
              <span className="option-text text-2xl font-semibold text-gray-700">
                Education
              </span>
            </div>
          </Link>
        </li>

        <li className="donate-option bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <Link to="/option-two" className="donate-link block p-6">
            <div className="option-content text-center">
              <img
                src={rf}
                alt="Relief Funds"
                className="option-image w-20 h-20 mx-auto mb-4"
              />
              <span className="option-text text-2xl font-semibold text-gray-700">
                Relief Funds
              </span>
            </div>
          </Link>
        </li>

        <li className="donate-option bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <Link to="/option-three" className="donate-link block p-6">
            <div className="option-content text-center">
              <img
                src={med}
                alt="Medicines"
                className="option-image w-20 h-20 mx-auto mb-4"
              />
              <span className="option-text text-2xl font-semibold text-gray-700">
                Medicines
              </span>
            </div>
          </Link>
        </li>
        <li className="donate-option bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <Link to="/option-three" className="donate-link block p-6">
            <div className="option-content text-center">
              <img
                src={med}
                alt="Medicines"
                className="option-image w-20 h-20 mx-auto mb-4"
              />
              <span className="option-text text-2xl font-semibold text-gray-700">
                Medicines
              </span>
            </div>
          </Link>
        </li>
        <li className="donate-option bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <Link to="/option-three" className="donate-link block p-6">
            <div className="option-content text-center">
              <img
                src={med}
                alt="Medicines"
                className="option-image w-20 h-20 mx-auto mb-4"
              />
              <span className="option-text text-2xl font-semibold text-gray-700">
                Medicines
              </span>
            </div>
          </Link>
        </li>
        <li className="donate-option bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <Link to="/option-three" className="donate-link block p-6">
            <div className="option-content text-center">
              <img
                src={med}
                alt="Medicines"
                className="option-image w-20 h-20 mx-auto mb-4"
              />
              <span className="option-text text-2xl font-semibold text-gray-700">
                Medicines
              </span>
            </div>
          </Link>
        </li>
        <li className="donate-option bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <Link to="/option-three" className="donate-link block p-6">
            <div className="option-content text-center">
              <img
                src={med}
                alt="Medicines"
                className="option-image w-20 h-20 mx-auto mb-4"
              />
              <span className="option-text text-2xl font-semibold text-gray-700">
                Medicines
              </span>
            </div>
          </Link>
        </li>
        <li className="donate-option bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <Link to="/option-three" className="donate-link block p-6">
            <div className="option-content text-center">
              <img
                src={med}
                alt="Medicines"
                className="option-image w-20 h-20 mx-auto mb-4"
              />
              <span className="option-text text-2xl font-semibold text-gray-700">
                Medicines
              </span>
            </div>
          </Link>
        </li>
        <li className="donate-option bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
          <Link to="/option-three" className="donate-link block p-6">
            <div className="option-content text-center">
              <img
                src={med}
                alt="Medicines"
                className="option-image w-20 h-20 mx-auto mb-4"
              />
              <span className="option-text text-2xl font-semibold text-gray-700">
                Medicines
              </span>
            </div>
          </Link>
        </li>

      </ul>
    </div>

  );
};

export default Donate;
