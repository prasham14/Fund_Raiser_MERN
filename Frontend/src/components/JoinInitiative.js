import React from 'react'
import axios from 'axios';
import { useState } from 'react';
const JoinInitiative = ({ initiativeId }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token')
  console.log(token)
  const handleJoinInitiative = async () => {
    try {
      // Validate user input
      if (!name || !phone) {
        setMessage('Name and phone number are required.');
        return;
      }

      // Send POST request to join the initiative
      const response = await axios.post(
        `http://localhost:5000/join/${initiativeId}`,
        { name, phone }, // Request body (data)
        {
          headers: {
            Authorization: `Bearer ${token}`, // Fix the Authorization header
          },
        }
      );
      console.log(response);

      // Handle success response
      setMessage(response.data.message || 'Successfully joined the initiative!');
    } catch (error) {
      // Handle error response
      if (error.response) {
        // Server responded with a status other than 200
        setMessage(error.response.data.error || 'An error occurred.');
      } else {
        // Network error or other issues
        setMessage('Unable to join initiative. Please try again.');
      }
    }
  };


  return (
    <div>
      <h2>Join Initiative</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Phone:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleJoinInitiative}>Join</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default JoinInitiative
