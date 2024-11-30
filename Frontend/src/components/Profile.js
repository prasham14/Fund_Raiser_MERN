import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiLogout } from "react-icons/ci";
// import defaultimg from './images/profile.png';
// import editimg from './images/edit.png'
import { CiEdit } from "react-icons/ci"
import SeeDetails from './SeeDetails';
import { useNavigate } from 'react-router-dom';
function Profile({ setIsLoggedIn, setActivesection }) {
  const [username, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [isDetailsAdded, setIsDetailsAdded] = useState(false);
  const navigate = useNavigate();
  const [newData, setNewData] = useState({
    username: '',
    email: '',
    image: ''
  });
  const [isEmailChange, setIsEmailChange] = useState(false);
  const id = localStorage.getItem('email');
  console.log(id);
  const handleMyDonations = () => {
    navigate('/myDonations')
  }
  useEffect(() => {
    if (!id) {
      console.error('No email found in localStorage');
      return;
    }

    axios.get(`http://localhost:5000/getUser/${id}`, { withCredentials: true })
      .then((response) => {
        const userData = response.data.response;
        console.log(userData);
        if (userData) {
          setName(userData.username);
          setEmail(userData.email);
          setProfileImage(userData.profileImage);
          setNewData({
            username: userData.username,
            email: userData.email
          });
        }
        else {
          console.error('No user data found in response.');
        }
      })
      .catch((error) => {
        console.log("Error fetching user details:", error);
      });
  }, [id]);

  const userId = localStorage.getItem('userId');
  const changeNameHandler = async () => {

    try {
      const res = await axios.put(`http://localhost:5000/UpdateName/${userId}`, { username: newData.username }, { withCredentials: true });
      console.log(res);
      console.log(newData.username);
      setName(newData.username);
      setIsChange(false);
    }

    catch (error) {
      console.error("Error updating name:", error)
    };
  };



  const changeEmailHandler = () => {
    let OTP = Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('otp', OTP);
    axios.patch(`http://localhost:5000/user/EmailVerify/${newData.email}/${OTP}`, { withCredentials: true })
      .then(() => {
        setIsChangeEmail(false);
        setIsEmailChange(true);
      })
      .catch(error => console.error("Error updating email:", error));
  };
  const onChangeHandler = (event) => {
    setNewData({
      ...newData,
      [event.target.name]: event.target.value
    });
  };

  const OTPHandler = (e) => {
    e.preventDefault();
    const otpValue = e.target[0].value;
    const storedOtp = localStorage.getItem('otp');
    if (otpValue === storedOtp) {
      alert("OTP Verified Successfully!");
      setIsEmailChange(false);
      axios.patch(`http://localhost:5000/user/editEmail/${email}`, { email: newData.email }, { withCredentials: true }).then(() => {
        console.log("Email updated successfully.");
        setEmail(newData.email);
      });
    } else {
      alert("Incorrect OTP. Try again.");
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    setActivesection('');
  }
  const handleSeeDetails = () => {
    setActivesection('seeDetails');
    <SeeDetails isDetailsAdded={isDetailsAdded} setIsDetailsAdded={setIsDetailsAdded} />
  }
  const handleMyFunds = () => {
    navigate('/myFunds');
  }
  const handleMyInitiatives = () => {
    navigate('/myInitiatives')
  }

  return (
    <div className="w-full p-6 bg-gradient-to-br from-black via-gray-900 to-black shadow-lg rounded-xl border border-gray-700 relative">
      {/* Logout Icon */}
      <div className="absolute top-4 left-4 flex items-center space-x-4 text-white">
        <button
          onClick={handleLogout}
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition shadow-md"
        >
          <CiLogout className="text-lg" />
        </button>

        <h1 className="text-3xl font-bold text-white ml-9">Profile</h1>
      </div>

      {/* Profile Image and Header */}
      <div className="text-center mb-8 mt-16">
        {/* Profile Image Placeholder */}
        {profileImage ? (
          <img
            src={profileImage} // Assuming profileImage is the source
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-teal-500 shadow-lg"
          />
        ) : (
          <div className="w-24 h-24 rounded-full mx-auto bg-gray-600 animate-pulse"></div>
        )}
      </div>

      {/* Profile Details */}
      <div className="border-t border-gray-700 pt-3 space-y-6">
        {/* Name Section */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">Name:</h2>
          <div className="flex items-center">
            {isChange ? (
              <input
                type="text"
                name="username"
                value={newData.username}
                onChange={onChangeHandler}
                className="flex-grow text-white bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 transition"
              />
            ) : (
              <p className="text-gray-300 flex-grow">{username || 'Loading...'}</p>
            )}
            {isChange ? (
              <button
                onClick={changeNameHandler}
                className="ml-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition shadow-md"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsChange(true)}
                className="ml-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition shadow-md"
              >
                <CiEdit fontSize="1.45rem" />
              </button>
            )}
          </div>
        </div>

        {/* Email Section */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">Email:</h2>
          <div className="flex items-center">
            {isChangeEmail ? (
              <input
                type="email"
                name="email"
                value={newData.email}
                onChange={onChangeHandler}
                className="flex-grow text-white bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 transition"
              />
            ) : (
              <p className="text-gray-300 flex-grow truncate" style={{ maxWidth: 'calc(100% - 3rem)' }}>
                {email || 'Loading...'}
              </p>
            )}
            {isChangeEmail ? (
              <button
                onClick={changeEmailHandler}
                className="ml-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition shadow-md"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsChangeEmail(true)}
                className="ml-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition shadow-md"
              >
                <CiEdit fontSize="1.45rem" />
              </button>
            )}
          </div>
        </div>

        {/* Email Verification Section */}
        {isEmailChange && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Verify Email:</h2>
            <form onSubmit={OTPHandler} className="flex space-x-4">
              <input
                type="text"
                placeholder="Enter OTP"
                className="flex-grow text-white bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 transition"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition shadow-md"
              >
                Verify
              </button>
            </form>
          </div>
        )}

        {/* Additional Details Section */}
        <div>
          {!isDetailsAdded ? (
            <button
              onClick={handleSeeDetails}
              className="text-teal-400 underline hover:text-teal-500 transition"
            >
              Add personal details
            </button>
          ) : (
            <div></div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleMyInitiatives}
            className="w-full text-left px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          >
            My Initiatives
          </button>
          <button
            onClick={handleMyFunds}
            className="w-full text-left px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          >
            My Funds
          </button>
          <button
            onClick={handleMyDonations}
            className="w-full text-left px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition"
          >
            My Donations
          </button>
        </div>
      </div>
    </div>


  );
}
export default Profile;