import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Profile from '../components/Profile';
import { CgProfile } from "react-icons/cg";
const NavBar = ({ setActivesection }) => {
  // const [activeSection, setActivesection] = useState(null);
  const [isClicked, setisClicked] = useState(false);
  const [isFormClicked, setIsFormClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const navigate = useNavigate();
  function handleViewFundRaiser() {
    isLoggedIn ? (setActivesection('viewFundRaiser')) : (navigate('/login'))
  }
  function handlePdfs() {
    navigate('/pdfs')
  }
  function handleContactSupport() {
    navigate('/help');
  }
  function handleInitiatives() {
    isLoggedIn ? (navigate('/initiatives')) : (navigate('/login'));
  }
  function handleSignUp() {
    navigate('/signup');
  }

  function handleLogin() {

    navigate('/login');

  }
  function handleFormSubmission() {
    isLoggedIn ? (setActivesection('form')) : (navigate('/login'))
    setIsFormClicked(true);

  }
  function handleHome() {
    setActivesection('');
  }
  function handleNgo() {

    isLoggedIn ? (navigate('/ngos')) : (navigate('/login'))
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef]);


  useEffect(() => {
    const checkCookie = () => {
      const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('cookies='));
      if (!token) {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
        navigate('/');
      }
    };

    const interval = setInterval(checkCookie, Date.now() + 1 * 0.0167 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [navigate]);
  return (
    <div className="home-container flex flex-col bg-gray-100 overflow-hidden">
      <div className="navbar w-full bg-white fixed top-0 z-50 flex justify-between items-center px-8 py-4 shadow-md shadow-teal-400">
        <nav className="navbar-nav flex items-center justify-between w-full">
          {/* Logo and Title Section */}
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-teal-600 hover:text-teal-700 transition duration-300">
              FundRaiser Platform
            </h1>
          </div>

          {/* Action Buttons and Profile/Menu Section */}
          <div className="flex items-center space-x-6">
            <button
              className="inline-flex items-center justify-center bg-teal-500 text-white font-medium leading-[1.75] h-10 px-4 py-2 rounded-lg hover:bg-teal-600 shadow-md transition-all duration-300"
              onClick={handleHome}
            >
              Home
            </button>
            {/* Start Fundraiser Button */}
            {isLoggedIn && (
              <button
                className="inline-flex items-center justify-center bg-teal-500 text-white font-medium leading-[1.75] h-10 px-4 py-2 rounded-lg hover:bg-teal-600 shadow-md transition-all duration-300"
                onClick={handleFormSubmission}
              >
                Start a Fundraiser
              </button>
            )}

            {/* Help Button */}
            <button
              onClick={handleContactSupport}
              className="inline-flex items-center justify-center bg-gray-200 text-gray-700 font-medium leading-[1.75] h-10 px-4 py-2 rounded-lg hover:bg-gray-300 shadow-md transition-all duration-300"
            >
              Help
            </button>

            {/* Profile Section */}
            <div className="relative flex items-center space-x-4" ref={profileRef}>
              {isLoggedIn ? (
                <div className='relative' >
                  <button
                    className="inline-flex items-center justify-center bg-gray-200 text-gray-700 font-medium leading-[1.75] h-10 px-4 py-2 rounded-lg hover:bg-gray-300 shadow-md transition-all duration-300"
                    onClick={toggleProfile}

                  >
                    <CgProfile className="text-2xl" />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute top-12 right-0 w-[300px] bg-gray-800 text-white rounded-lg shadow-lg p-4">
                      <div>
                        <Profile
                          isLoggedIn={isLoggedIn}
                          setIsLoggedIn={setIsLoggedIn}
                          setActivesection={setActivesection}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    className="bg-teal-500 text-white font-medium leading-[1.75] h-10 px-4 py-2 rounded-lg hover:bg-teal-600 shadow-md transition-all duration-300"
                    onClick={handleSignUp}
                  >
                    Signup
                  </button>
                  <button
                    className="bg-gray-200 text-gray-700 font-medium leading-[1.75] h-10 px-4 py-2 rounded-lg hover:bg-gray-300 shadow-md transition-all duration-300"
                    onClick={handleLogin}
                  >
                    LogIn
                  </button>
                </>
              )}
            </div>

            {/* Menu Section */}
            <div className="relative" ref={menuRef}>
              <button
                className="inline-flex items-center justify-center bg-gray-200 text-gray-700 font-medium leading-[1.75] h-10 px-4 py-2 rounded-lg hover:bg-gray-300 shadow-md transition-all duration-300"
                onClick={toggleMenu}
              >
                Menu
              </button>
              {isMenuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-2 text-gray-700 space-y-2">
                  <li>
                    <button
                      onClick={handleViewFundRaiser}
                      className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200"
                    >
                      View Fundraisers
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleInitiatives}
                      className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200"
                    >
                      Initiatives
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleNgo}
                      className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded-lg transition duration-200"
                    >
                      NGO's
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default NavBar;
