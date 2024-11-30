import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";
import UserDocuments from './UserDoc';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registering chart components for use
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Option1 = ({ setActivesection }) => {
  const [funds, setFunds] = useState([]);
  const [selectedFund, setSelectedFund] = useState(null);
  const [isDoc, setIsDoc] = useState('');
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
        console.log(response);
      } catch (error) {
        console.error('Error fetching education funds', error);
      }
    };
    fetchFunds();
  }, [token]);

  const handleBankDetails = () => {
    localStorage.setItem('fundUserId', selectedFund.userId);
    setActivesection('bankdetailsoffund');
  };

  const clickHandler = (fund) => {
    setSelectedFund(fund);
  };

  const fundId = localStorage.getItem('selectedFundId');
  const handleDonate = () => {
    setIsDoc('selected');
  };

  const goBackHandler = () => {
    setSelectedFund(null);
  };

  const handleBack = () => {
    setActivesection('viewFundRaiser');
  };

  const render = () => {
    switch (isDoc) {
      case 'selected':
        return <UserDocuments fundId={fundId} />;
      default:
        return null;
    }
  };

  const isFundEndingSoon = (date) => {
    const today = new Date();
    const fundDate = new Date(date);
    const timeDiff = fundDate - today;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    return daysDiff > 0 && daysDiff <= 10; // Check if the date is within 10 days
  };

  // Chart data function
  const getChartData = (fund) => {
    const goalAmount = fund.funds || 0; // Default to 0 if undefined
    const raisedAmount = fund.raised || 0; // Default to 0 if undefined

    return {
      labels: ['Fund Raised'],
      datasets: [
        {
          label: 'Raised Amount (INR)',
          data: [raisedAmount],
          backgroundColor: 'rgba(75, 192, 192, 0.6)', // Raised amount color
        },
        {
          label: 'Goal Amount (INR)',
          data: [goalAmount],
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Goal amount color
        },
      ],
    };
  };

  return (
    <div className="funds-container max-w-5xl mx-auto p-6 bg-gradient-to-b from-gray-100 to-white rounded-lg shadow-lg overflow-y-auto no-scrollbar">
      <button onClick={handleBack} className="mb-4 flex items-center text-blue-500 hover:underline">
        <FaArrowLeft className="mr-2" /> Back
      </button>
      {selectedFund ? (
        <div className="fund-details-container max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">{selectedFund.title}</h1>
          <p className="mb-3 text-gray-700"><strong>Purpose:</strong> {selectedFund.details}</p>
          <p className="mb-3 text-gray-700"><strong>Funds Available:</strong> {selectedFund.funds} INR</p>
          <p className="mb-3 text-gray-700"><strong>Amount Raised:</strong> {selectedFund.raised} INR</p>
          <p className="mb-6 text-gray-700"><strong>Needed before:</strong> {new Date(selectedFund.date).toLocaleDateString()}</p>
          {localStorage.setItem('selectedFundId', selectedFund._id)}
          {selectedFund.isExpired && (
            <p className="text-red-500 font-bold text-lg">Expired</p>
          )}
          <div className="chart-container my-4">
            <Bar
              data={getChartData(selectedFund)}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: selectedFund.funds, // Set the max value to goal amount
                  },
                },
              }}
            />
          </div>
          <button
            onClick={handleDonate}
            className="bg-green-500 text-white py-2 px-4 rounded shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out"
          >
            Documents
          </button>
          <button
            onClick={handleBankDetails}
            className="bg-green-500 text-white py-2 px-4 rounded shadow-lg hover:bg-green-600 transition-all duration-300 ease-in-out"
          >
            Bank Details
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded ml-4 shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out"
            onClick={goBackHandler}
          >
            Back to Funds List
          </button>
          <div>{render()}</div>
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
                  <p className="mb-6 text-gray-700"><strong>Needed Before:</strong> {new Date(fund.date).toLocaleDateString()}</p>
                  {isFundEndingSoon(fund.date) && (
                    <p className="text-yellow-600 font-bold">Fund ending soon!</p>
                  )}
                  {fund.isExpired ? (
                    <p className="text-red-500 font-bold">Expired</p>
                  ) : (
                    <button
                      className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out w-full"
                      onClick={() => clickHandler(fund)}
                    >
                      Click here for details
                    </button>
                  )}
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
