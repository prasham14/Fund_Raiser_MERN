import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Option2 = () => {
  const [funds, setFunds] = useState([]);
  const [selectedFund, setSelectedFund] = useState(null); // To store the selected fund

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/option2', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFunds(response.data);
      } catch (error) {
        console.error('Error fetching funds', error);
      }
    };
    fetchFunds();
  }, [token]);

  const clickHandler = (fund) => {
    setSelectedFund(fund); // Set the clicked fund to display its details
  };

  const goBackHandler = () => {
    setSelectedFund(null); // Clear the selected fund to go back to the list
  };

  return (
    <div className="funds-container max-w-7xl mx-auto p-4">
      {selectedFund ? (
        // Render the selected fund's details if a fund is selected
        <div className="fund-details-container max-w-5xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">{selectedFund.title}</h1>
          <p className="mb-2"><strong>Purpose:</strong> {selectedFund.details}</p>
          <p className="mb-2"><strong>Funds Available:</strong> {selectedFund.funds} INR</p>
          <p className="mb-2"><strong>Amount Raised:</strong> {selectedFund.raised} INR</p>
          <p className="mb-2"><strong>Date Created:</strong> {new Date(selectedFund.date).toLocaleDateString()}</p>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-600 transition duration-300"
          >
            Donate to this Fund
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded mt-4 ml-4 hover:bg-gray-600 transition duration-300"
            onClick={goBackHandler}
          >
            Back to Funds List
          </button>
        </div>
      ) : (
        // Render the list of funds if no fund is selected
        <>
          <h1 className="text-4xl font-bold text-center mb-8">Relief Funds</h1>
          <ul className="funds-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {funds.length > 0 ? (
              funds.map((fund, index) => (
                <li key={index} className="fund-card bg-white shadow-lg rounded-lg p-6">
                  <h2 className="fund-title text-2xl font-semibold mb-2">{fund.title}</h2>
                  <p className="mb-2"><strong>Purpose:</strong> {fund.details}</p>
                  <p className="mb-2"><strong>Funds Available:</strong> {fund.funds} INR</p>
                  <p className="mb-2"><strong>Amount Raised:</strong> {fund.raised} INR</p>
                  <p className="mb-4"><strong>Date Created:</strong> {new Date(fund.date).toLocaleDateString()}</p>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                    onClick={() => clickHandler(fund)}
                  >
                    Click here for details
                  </button>
                </li>
              ))
            ) : (
              <p className="text-center text-lg">No Relief funds found</p>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default Option2;


