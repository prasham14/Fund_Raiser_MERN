import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";
import UserDocuments from './UserDoc';
import { VictoryPie } from 'victory';
import ShowBankDetails from './ShowBankDetails';
import PaymentComponent from './PaymentPage';
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
        // console.log(response);
      } catch (error) {
        console.error('Error fetching education funds', error);
      }
    };
    fetchFunds();
  }, [token]);

  const handleBankDetails = () => {
    localStorage.setItem('fundUserId', selectedFund.userId);
    setIsDoc('bankdetailsoffund');
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
    setIsDoc('');
  };

  const handleBack = () => {
    setActivesection('viewFundRaiser');
  };

  const render = () => {
    switch (isDoc) {
      case 'selected':
        return <UserDocuments fundId={fundId} />;
      case 'bankdetailsoffund':
        return <ShowBankDetails setIsDoc={setIsDoc} />;
      case 'pay':
        return <PaymentComponent />
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

    return [
      { x: 'Raised', y: raisedAmount },
      { x: 'Remaining', y: goalAmount - raisedAmount },
    ];
  };

  return (
    <div className=" max-w-5xl mx-4 p-6 bg-white rounded-lg shadow-lg mt-20 overflow-y-auto h-fit max-h-[75%] ">

      {selectedFund ? (
        <div className="mx-4 p-4 ">
          <h1 className="sm:text-3xl text-2xl font-bold mb-4 text-gray-900 text-center">{selectedFund.title}</h1>
          <p className="mb-3 text-gray-700"><strong>Purpose:</strong> {selectedFund.details}</p>
          <div className='flex justify-between items-center mb-8 flex-col lg:flex-row'>
            <div>
              <p className="mb-3 text-gray-700"><strong>Funds Available:</strong> {selectedFund.funds} INR</p>
              <p className="mb-3 text-gray-700"><strong>Amount Raised:</strong> {selectedFund.raised} INR</p>
              <p className="mb-3 text-gray-700"><strong>Phone Number:</strong> {selectedFund.phone}</p>
            </div>

            {/* <p className="mb-6 text-gray-700"><strong>Needed before:</strong> {new Date(selectedFund.date).toLocaleDateString()}</p> */}
            {localStorage.setItem('selectedFundId', selectedFund._id)}
            {selectedFund.isExpired && (
              <p className="text-red-500 font-bold text-lg">Expired</p>
            )}
            <div className="chart-container mr-8 w-24 relative">
              <VictoryPie
                data={getChartData(selectedFund)}
                innerRadius={100} // Makes it a donut chart
                colorScale={['rgb(170, 59, 40)', 'rgb(242, 241, 237)']} // Updated colors
                labels={() => ''} // Hides slice labels
                style={{
                  labels: { fill: 'gray', fontSize: 20, fontWeight: 'bold' },
                }}
              />
              {/* Central label showing percentage */}
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-800  font-bold text-xs"
                style={{ pointerEvents: 'none' }}
              >
                {selectedFund ? `${((selectedFund.raised / selectedFund.funds) * 100).toFixed(2)}%` : '0%'}
              </div>
            </div>
          </div>


          <div className='flex flex-col justify-between items-center sm:justify-start gap-3 sm:flex-row'>
            <button
              onClick={handleDonate}
              className="bg-black text-white py-2 px-4 rounded shadow-lg hover:bg-[#aa4528] transition-all duration-300 ease-in-out w-fit "
            >
              Documents
            </button>
            <button
              onClick={handleBankDetails}
              className="bg-black text-white py-2 px-4 rounded shadow-lg hover:bg-[#aa4528] transition-all duration-300 ease-in-out w-fit"
            >
              Bank Details
            </button>
            <button
              className="bg-[#aa4528] text-white py-2 px-4 rounded shadow-lg hover:bg-black transition-all duration-300 ease-in-out w-fit"
              onClick={goBackHandler}
            >
              Back to Funds List
            </button>
          </div>

          <div>{render()}</div>
        </div>
      ) : (
        <div className='w-full h-full'>

          <button onClick={handleBack} className=" absolute items-center text-black hover:underline">
            <FaArrowLeft className="mr-2" />
          </button>
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Education Funds</h1>

          <ul className="">
            {funds.length > 0 ? (
              funds.map((fund, index) => (
                <li
                  key={index}
                  className="fund-card bg-white  p-6 transition-transform transform hover:-translate-y-2 border border-black m-2 rounded-lg hover:shadow-2xl overflow-hidden "
                >
                  <h2 className="fund-title text-2xl font-semibold mb-3 text-gray-900">{fund.title}</h2>
                  <p className="mb-2 text-gray-700"><strong>Purpose:</strong> {fund.details}</p>
                  <p className="mb-2 text-gray-700"><strong>Funds Available:</strong> {fund.funds} INR</p>
                  <p className="mb-2 text-gray-700"><strong>Amount Raised:</strong> {fund.raised} INR</p>
                  {/* <p className="mb-6 text-gray-700"><strong>Needed Before:</strong> {new Date(fund.date).toLocaleDateString()}</p> */}
                  {isFundEndingSoon(fund.date) && (
                    // <p className="text-yellow-600 font-bold">Fund ending soon!</p>
                    null
                  )}
                  {fund.isExpired ? (
                    <p className="text-red-500 font-bold">Expired</p>
                  ) : (
                    <button
                      className="bg-black text-white py-2 px-4 rounded-lg shadow-lg hover:bg-[#aa4528] transition-all duration-300 ease-in-out w-fit"
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
        </div>

      )
      }
    </div >
  );
};

export default Option1;
