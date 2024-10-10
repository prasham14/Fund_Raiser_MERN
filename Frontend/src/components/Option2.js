import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import "./Option1.css"
const Option2 = () => {
  const [funds, setFunds] = useState([]);
  const navigate = useNavigate();
  function donateHandler() {
    navigate("/donation");
  }
  useEffect(() => {
    // Fetch education-type funds from the backend
    const fetchFunds = async () => {
      try {
        const response = await axios.get('http://localhost:5000/option2');
        setFunds(response.data);
      } catch (error) {
        console.error('Error fetching education funds', error);
      }
    };

    fetchFunds();
  }, []);

  return (
    <div className="funds-container">
      <h1>Education Funds</h1>
      <ul className="funds-list">
        {funds.length > 0 ? (
          funds.map((fund, index) => (
            <li key={index} className="fund-card">
              <h2 className="fund-title">{fund.title}</h2>
              <p><strong>Purpose:</strong> {fund.purpose}</p>
              <p><strong>Funds Available:</strong> ${fund.funds}</p>
              <p><strong>Amount Raised:</strong> ${fund.raised}</p>
              <p><strong>Date Created:</strong> {new Date(fund.date).toLocaleDateString()}</p>
              <button onClick={donateHandler}>Donate</button>
              {fund.documents && (
                <p><strong>Documents:</strong> {(', ')}</p>
              )}
            </li>
          ))
        ) : (
          <p>No education funds found</p>
        )}
      </ul>
    </div>
  );
};

export default Option2;

