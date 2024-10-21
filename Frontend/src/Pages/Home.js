import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Main from '../components/Main';
import Doc from '../components/Doc'
import FormSubmission from '../components/FundRaise';
import NGO from '../components/NGO';
import Option1 from '../components/Option1';
import Option2 from '../components/Option2';
import Option3 from '../components/Option3';
import Profile from '../components/Profile';
import Initiatives from '../components/Initiatives';
import ViewFundRaiser from '../components/ViewFundRaiser';
import CreateInitiative from '../components/CreateInitiative';
const userId = '67011cf9122020cfe0bf42b3';
const Home = () => {
  const [activeSection, setActivesection] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const navigate = useNavigate();

  function handleViewFundRaiser() {
    if (isLoggedIn) {
      setActivesection('viewFundRaiser');


    }
    else {
      navigate('/login');


    }
  }
  function handleContactSupport() {
    navigate('/help');
  }
  function handleInitiatives() {
    if (isLoggedIn) {
      setActivesection('Initiative')
    }
    else {
      navigate('/signup');
    }
  }
  function handleSignUp() {
    navigate('/signup');
  }

  function handleLogin() {
    navigate('/login');

  }
  function handleProfile() {
    setActivesection('profile');
  }
  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  }

  function handleFormSubmission() {
    if (isLoggedIn) {
      setActivesection('form')
    }
    else {
      navigate('/login');
    }
  }
  function handleNgo() {
    if (isLoggedIn) {
      setActivesection('ngo')
    }
    else {
      navigate('/login');
    }
  }
  function handleMain() {
    setActivesection('main');
  }


  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu open/close state
  const menuRef = useRef(null); // Ref for the menu element

  // Handle toggling the menu when clicking the "Menu" button
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close menu if click is outside the menu
      }
    };
    // Listen for clicks on the whole document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup on component unmount
    };
  }, [menuRef]);
  const renderContent = () => {
    switch (activeSection) {
      case 'viewFundRaiser':
        return (
          <div>
            <ViewFundRaiser activeSection={activeSection} setActivesection={setActivesection} />
          </div>
        )
      case 'form':
        return (
          <div>
            <FormSubmission activeSection={activeSection} setActivesection={setActivesection} />
          </div>
        )
      case 'ngo':
        return (
          <NGO />
        )

      case 'main':
        return (
          <div>
            <Main />
          </div>
        )
      case 'profile':
        return (
          <div>
            <Profile userId={userId} />
          </div>
        )
      case 'Initiative':
        return (
          <div>
            <Initiatives activeSection={activeSection} setActivesection={setActivesection} />
          </div>
        )
      case 'option1':
        return <Option1 />;
      case 'option2':
        return <Option2 />;
      case 'option3':
        return <Option3 />;
      case 'createInitiatives':
        return (
          <div>
            <CreateInitiative />
          </div>
        )

      case 'doc':
        return (
          <Doc />
        )
      default:
        return (
          <div>
            <Main />
          </div>
        )
    }
  }
  return (

    <div className="home-container flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="navbar w-full bg-white fixed top-0 z-50 flex justify-between items-center px-8 py-4 shadow-md">
        <nav className="navbar-nav flex items-center justify-between w-full">
          {/* Left Side - Logo or Brand */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-teal-500">FundRaiser Platform</h1>
          </div>

          {/* Right Side - Menu and Buttons */}
          <div className="flex items-center space-x-6">
            {/* Start a Fundraiser Button */}
            <button
              className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out"
              onClick={isLoggedIn ? handleFormSubmission : handleSignUp}
            >
              Start a Fundraiser
            </button>
            <button
              onClick={handleContactSupport}
              className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out"
            >
              Contact Support
            </button>
            {/* Conditional Render for SignIn/LogIn/Profile */}
            {isLoggedIn ? (
              <button
                className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out"
                onClick={handleProfile}
              >
                Profile
              </button>
            ) : (
              <>
                <button
                  className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out"
                  onClick={handleSignUp}
                >
                  Signup
                </button>

                <button
                  className="bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out"
                  onClick={handleLogin}
                >
                  LogIn
                </button>

              </>
            )}

            {/* Dropdown Menu */}
            <div className="relative" ref={menuRef}>
              <button
                className="text-gray-700 hover:text-teal-500 focus:outline-none"
                onClick={toggleMenu}
              >
                Menu
              </button>

              {isMenuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-2 text-gray-700 space-y-2">
                  <li>
                    <button
                      onClick={handleMain}
                      className="w-full text-left hover:text-teal-500"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleViewFundRaiser}
                      className="w-full text-left hover:text-teal-500"
                    >
                      View Fundraisers
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleContactSupport}
                      className="w-full text-left hover:text-teal-500"
                    >
                      Contact Support
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleInitiatives}
                      className="w-full text-left hover:text-teal-500"
                    >
                      Initiatives
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleNgo}
                      className="w-full text-left hover:text-teal-500"
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

      {/* Page Content */}
      <div className="mt-20">{renderContent()}</div>
    </div>

  )
};


export default Home;
