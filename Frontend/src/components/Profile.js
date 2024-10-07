import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [username, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isChange, setIsChange] = useState(false);
  const [newData, setNewData] = useState({
    username: '',
    email: ''
  });

  const id = localStorage.getItem('email');
  console.log(id);
  useEffect(() => {
    if (!id) {
      console.error('No email found in localStorage');
      return;
    }

    axios.get(`http://localhost:5000/getUser/${id}`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        const userData = response.data.response;
        console.log(userData);
        if (userData) {
          setName(userData.username);
          setEmail(userData.email);
          // setProfileImage(userData.profileImage);
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

  // const changeNameHandler = () => {
  //   axios.patch(`http://localhost:5000/UpdateName/:${email}`, { username: newData.username }, { withCredentials: true })
  //     .then(() => {
  //       setName(newData.username);
  //       setIsChange(false);
  //     })
  //     .catch(error => console.error("Error updating name:", error));
  // };

  // const onChangeHandler = (event) => {
  //   setNewData({
  //     ...newData,
  //     [event.target.username]: event.target.value
  //   });
  // };

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
                name="name"
                value={newData.username}
              // onChange={onChangeHandler}
              />
            ) : (
              <p className="text-xl text-gray-600">{username ? username : 'Loading...'}</p>
            )}
            <div className="flex justify-end mt-3">
              {isChange ? (
                <button
                  className="px-6 py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition duration-200 ease-in-out shadow-md"
                // onClick={changeNameHandler}
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

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Email:</h2>
            <p className="text-xl text-gray-600">{email ? email : 'Loading...'}</p>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full hover:bg-indigo-700 transition duration-200 ease-in-out shadow-lg">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;