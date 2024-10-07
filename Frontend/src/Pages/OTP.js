import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const OtpForm = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState('');

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/send-otp', { phoneNumber });
      setMessage(response.data.message);
      setIsOtpSent(true);
      navigate('/after');
    } catch (error) {
      setMessage('Failed to send OTP');
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify-otp', { phoneNumber, otp });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Invalid OTP or OTP expired');
    }
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      {message && <p>{message}</p>}
      {!isOtpSent ? (
        <form onSubmit={sendOtp}>
          <label>
            Phone Number:
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </label>
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={verifyOtp}>
          <label>
            Enter OTP:
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </label>
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default OtpForm;
