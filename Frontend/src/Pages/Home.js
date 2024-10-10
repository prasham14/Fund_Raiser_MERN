import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../components/Main';
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
      navigate('/signup');

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
      navigate('/signup');
    }
  }
  function handleNgo() {
    if (isLoggedIn) {
      setActivesection('ngo')
    }
    else {
      navigate('/signup');
    }
  }
  function handleMain() {
    setActivesection('main');
  }

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
            <FormSubmission />
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
      <div className="navbar w-full bg-white  fixed top-0 z-50 flex justify-between items-center px-8 py-4">
        <nav className="navbar-nav flex space-x-4">
          <button
            className="nav-button bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out"
            onClick={isLoggedIn ? (handleFormSubmission) : (handleSignUp)}
          >
            Start a Fundraiser
          </button>

          <div>
            {
              isLoggedIn ? (<div></div>) :
                (<button
                  className="nav-button bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out"
                  onClick={handleSignUp}
                >
                  SignIn
                </button>)
            }
          </div>

          <div>
            {
              isLoggedIn ? (<button
                className="nav-button bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out"
                onClick={handleProfile}
              >
                Profile
              </button>) :
                (<button
                  className="nav-button bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-200 ease-in-out"
                  onClick={handleLogin}
                >
                  LogIn
                </button>)
            }
          </div>
        </nav>

      </div>
      <div className="sidebar bg-white w-64 h-full py-8 px-6 fixed top-0 left-0 shadow-lg mt-16">
        <h2 className="text-xl font-bold text-black mb-6 mt-6 text-center">Menu</h2>
        <ul className="space-y-4">
          <li>
            <button
              onClick={handleMain}
              className="sidebar-link w-full text-left text-black  font-semibold py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-teal-100"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={handleViewFundRaiser}
              className="sidebar-link w-full text-left text-black  font-semibold py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-teal-100"
            >
              View Fundraisers
            </button>
          </li>
          <li>
            <button
              onClick={handleContactSupport}
              className="sidebar-link w-full text-left text-black  font-semibold py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-teal-100"
            >
              Contact Support
            </button>
          </li>
          <li>
            <button
              onClick={handleInitiatives}
              className="sidebar-link w-full text-left text-black  font-semibold py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-teal-100"
            >
              Initiatives
            </button>
          </li>
          <li>
            <button
              onClick={handleNgo}
              className="sidebar-link w-full text-left text-black  font-semibold py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-teal-100"
            >
              NGO's
            </button>
          </li>
          <li>
            <div >
              {
                isLoggedIn ? (<button
                  className="sidebar-link w-full text-left text-black  font-semibold py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-teal-100"
                  onClick={handleSignOut}
                >
                  Logout
                </button>) :
                  (<div></div>)
              }
            </div>
          </li>
        </ul>
      </div>

      <div>{renderContent()}</div>
    </div>
  )
};


export default Home;
