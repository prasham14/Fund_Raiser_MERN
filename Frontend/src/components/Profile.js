import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [username, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isChangeEmail, setIsChangeEmail] = useState(false);

  const [isChange, setIsChange] = useState(false);
  const [newData, setNewData] = useState({
    username: '',
    email: ''
  });
  const [isEmailChange, setIsEmailChange] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const id = localStorage.getItem('email');
  console.log(id);
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

  const changeNameHandler = () => {
    axios.patch(`http://localhost:5000/UpdateName/${id}`, { username: newData.username }, { withCredentials: true })
      .then(() => {
        setName(newData.username);
        setIsChange(false);
      })
      .catch(error => console.error("Error updating name:", error));
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


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageHandler = () => {
    const formData = new FormData();
    formData.append('image', imageFile);
    axios.post(`http://localhost:5000/user/uploadImage/${email}`, formData, { withCredentials: true })
      .then(() => {
        console.log("Image uploaded successfully");
      })
      .catch(error => console.error("Error uploading image:", error));
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full">
        <div className="text-center mb-8">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-gradient-to-r from-purple-500 to-pink-500"
            />
          ) : (
            <div className="w-28 h-28 rounded-full mx-auto bg-gray-200 animate-pulse"></div>
          )}
          <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-2">Profile</h1>
          <p className="text-lg text-gray-500">Manage your account details</p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Name:</h2>
            {isChange ? (
              <input
                className="border border-gray-300 rounded-xl p-3 w-full mt-1 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                type="text"
                name="username"
                value={newData.username}
                onChange={onChangeHandler}
              />
            ) : (
              <p className="text-xl text-gray-600">{username ? username : 'Loading...'}</p>
            )}
            <div className="flex justify-end mt-3">
              {isChange ? (
                <button
                  className="px-6 py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition duration-200 ease-in-out shadow-md"
                  onClick={changeNameHandler}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition duration-200 ease-in-out shadow-md"
                  onClick={() => setIsChange(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>



          {/* Email Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Email:</h2>
            <div className="flex items-center">
              {isChangeEmail ? (
                <input
                  className="border border-gray-300 rounded-xl p-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                  type="email"
                  name="email"
                  value={newData.email}
                  onChange={onChangeHandler}
                />
              ) : (
                <p className="text-xl text-gray-600 flex-grow">{email || 'Loading...'}</p>
              )}
              {isChangeEmail ? (
                <button
                  className="ml-4 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition shadow-md"
                  onClick={changeEmailHandler}
                >
                  Save
                </button>
              ) : (
                <button
                  className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition shadow-md"
                  onClick={() => setIsChangeEmail(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* OTP Verification */}
          {isEmailChange && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Verify Email:</h2>
              <form onSubmit={OTPHandler} className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="border border-gray-300 rounded-lg p-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-md"
                >
                  Verify
                </button>
              </form>
            </div>
          )}

          {/* Image Upload Section */}
          <div className="flex flex-col sm:flex-row justify-between mt-8">
            <div className="w-full sm:w-auto">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="border border-gray-300 rounded-lg p-2 w-full mb-3"
              />
              <button
                onClick={uploadImageHandler}
                className="px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition shadow-lg w-full"
              >
                Upload Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;