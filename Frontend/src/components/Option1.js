import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";

const Option1 = ({ setActivesection }) => {
  const [funds, setFunds] = useState([]);
  const [selectedFund, setSelectedFund] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/option1', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFunds(response.data);
      } catch (error) {
        console.error('Error fetching education funds', error);
      }
    };
    fetchFunds();
  }, [token]);

  const handleDocument = () => {
    setActivesection('docs');
  };

  const clickHandler = (fund) => {
    setSelectedFund(fund);
  };

  const goBackHandler = () => {
    setSelectedFund(null);
  };

  const handleBack = () => {
    setActivesection('viewFundRaiser');
  };

  return (
    <div className="funds-container max-w-7xl mx-auto p-6 bg-gradient-to-b from-gray-100 to-white rounded-lg shadow-lg">
      <button onClick={handleBack}><FaArrowLeft /></button>
      {selectedFund ? (
        <div className="fund-details-container max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">{selectedFund.title}</h1>
          <p className="mb-3 text-gray-700"><strong>Purpose:</strong> {selectedFund.details}</p>
          <p className="mb-3 text-gray-700"><strong>Funds Available:</strong> {selectedFund.funds} INR</p>
          <p className="mb-3 text-gray-700"><strong>Amount Raised:</strong> {selectedFund.raised} INR</p>
          <p className="mb-6 text-gray-700"><strong>Date Created:</strong> {new Date(selectedFund.date).toLocaleDateString()}</p>

          {selectedFund.isExpired && (
            <p className="text-red-500 font-bold text-lg">Expired</p>
          )}

          <button
            onClick={() => handleDocument(selectedFund.documentUrl)}
            className="bg-green-500 text-white py-2 px-4 rounded shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out"
          >
            Documents
          </button>

          <button
            className="bg-gray-500 text-white py-2 px-4 rounded ml-4 shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out"
            onClick={goBackHandler}
          >
            Back to Funds List
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Education Funds</h1>
          <ul className="funds-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {funds.length > 0 ? (
              funds.map((fund, index) => (
                <li
                  key={index}
                  className="fund-card bg-white shadow-md rounded-lg p-6 transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:bg-blue-50"
                >
                  <h2 className="fund-title text-2xl font-semibold mb-3 text-gray-900">{fund.title}</h2>
                  <p className="mb-2 text-gray-700"><strong>Purpose:</strong> {fund.details}</p>
                  <p className="mb-2 text-gray-700"><strong>Funds Available:</strong> {fund.funds} INR</p>
                  <p className="mb-2 text-gray-700"><strong>Amount Raised:</strong> {fund.raised} INR</p>
                  <p className="mb-6 text-gray-700"><strong>Date Created:</strong> {new Date(fund.date).toLocaleDateString()}</p>

                  {fund.isExpired && (
                    <p className="text-red-500 font-bold">Expired</p>
                  )}
                  {
                    fund.isExpired ? (<div><p>This fund is expired , You can contact to the Raiser if you want to help</p></div>) : (
                      <div>
                        <button
                          className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out w-full"
                          onClick={() => clickHandler(fund)}
                        >
                          Click here for details
                        </button>
                      </div>
                    )
                  }

                </li>
              ))
            ) : (
              <p className="text-center text-lg text-gray-700 col-span-full">
                No education funds found
              </p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Option1;
