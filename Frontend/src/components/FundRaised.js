import React from 'react'
import { useNavigate } from 'react-router-dom'
const FundRaised = () => {
  const navigate = useNavigate();
  function clickHandler() {
    navigate('/form')
  }
  function clickHandler1() {
    navigate('/after')
  }
  function handleProfile() {
    navigate('profile');
  }
  return (

    <div className="home-container flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="navbar w-full bg-white shadow-md fixed top-0 z-50 flex justify-between items-center px-8 py-4">
        <nav className="navbar-nav flex space-x-4">
          <button
            className="nav-button bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition duration-200 ease-in-out"
            onClick={clickHandler}
          >
            Start a Fundraiser
          </button>
          <button
            className="nav-button bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition duration-200 ease-in-out"
            onClick={handleProfile}
          >
            Profile
          </button>
        </nav>
      </div>


      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mb-6">Fund Raised Successfully</h1>
        <div className="flex space-x-4">
          <button
            className="raise-button bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-green-600 transition duration-300"
            onClick={clickHandler}
          >
            Raise New Fund
          </button>
          <button
            className="raise-button bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300"
            onClick={clickHandler1}
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </div>



  )
}

export default FundRaised
