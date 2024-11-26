import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import MyInitiatives from '../components/MyInitiatives';
import MyFunds from '../components/MyFunds'
import CreateInitiative from '../components/CreateInitiative';
import Footer from '../components/Footer';
import Highlights from '../components/Highlights';
import Faqs from '../components/Faqs';
import PdfComp from '../components/PdfComp'
import PaymentPage from '../components/Transaction';
import SeeDetails from '../components/SeeDetails';
import ShowDetails from '../components/ShowDetails';
import ShowDoc from "../components/ShowDoc";
import ShowBankDetails from '../components/ShowBankDetails';
import Working from '../components/Working'
const Home = () => {
  const [activeSection, setActivesection] = useState(null);
  const [isClicked, setisClicked] = useState(false);
  const [isFormClicked, setIsFormClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const navigate = useNavigate();
  function handleViewFundRaiser() {
    isLoggedIn ? (setActivesection('viewFundRaiser')) : (navigate('/login'))
  }
  function handleContactSupport() {
    navigate('/help');
  }
  function handleInitiatives() {

    // <Initiatives setActivesection={setActivesection} />
    // setActivesection('Initiative');
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
  function handleNgo() {

    isLoggedIn ? (navigate('/ngos')) : (navigate('/login'))
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setisClicked(false);
      }
    }
    isClicked ? (document.addEventListener("mousedown", handleClickOutside)) : (document.removeEventListener("mousedown", handleClickOutside));
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClicked]);
  const renderContent = () => {
    // If there's an active section, we render the component on top with a blurred background
    if (activeSection) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          {renderActiveComponent()}
        </div>
      );
    }
    // If there's no active section, just render the default content
    // return <Main setActivesection={setActivesection} />;
  };


  useEffect(() => {
    const checkCookie = () => {
      // Check if the cookie is present
      const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('cookies='));
      if (!token) {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
        navigate('/');
      }
    };

    // Check for cookie expiration every 5 seconds
    const interval = setInterval(checkCookie, Date.now() + 1 * 0.0167 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [navigate]);
  const renderActiveComponent = () => {
    switch (activeSection) {
      case 'viewFundRaiser': return (<ViewFundRaiser activeSection={activeSection} setActivesection={setActivesection} />);
      case 'form': return (<FormSubmission activeSection={activeSection} setActivesection={setActivesection} />);
      case 'ngo': return (<NGO setActivesection={setActivesection} />);
      // case 'Initiative': return (<Initiatives setActivesection={setActivesection} />);
      case 'option1': return <Option1 setActivesection={setActivesection} />;
      case 'option2': return <Option2 setActivesection={setActivesection} />;
      case 'option3': return <Option3 setActivesection={setActivesection} />;
      case 'createInitiatives': return (<CreateInitiative activeSection={activeSection} setActivesection={setActivesection} />);
      case 'doc': return (<Doc activeSection={activeSection} setActivesection={setActivesection} />);
      case 'docs': return (<PdfComp setActivesection={setActivesection} />);
      case 'getini': return (<MyInitiatives setActivesection={setActivesection} />);
      case 'myFunds': return (<MyFunds setActivesection={setActivesection} />);
      case 'seeDetails': return (<SeeDetails setActivesection={setActivesection} />);
      case 'transaction': return (<PaymentPage setActivesection={setActivesection} />);
      case 'showPersonalDetails': return (<ShowDetails setActivesection={setActivesection} />);
      case 'showdoc': return (<ShowDoc setActivesection={setActivesection} />);
      case 'bankdetailsoffund': return (<ShowBankDetails setActivesection={setActivesection} />);
      default: return <Home />;
    }
  };

  return (
    <div className="home-container flex flex-col min-h-screen bg-gray-50 ">
      {/* Navbar */}
      <div className="navbar w-full bg-black fixed top-0 z-50 flex justify-between items-center px-8 py-4 shadow-md">
        <nav className="navbar-nav flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">FundRaiser Platform</h1>
          </div>
          <div className="flex items-center space-x-6">
            {/* Home Button */}
            <button
              className="inline-flex items-center justify-center relative cursor-pointer select-none box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem] h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 transition-all duration-300"
              onClick={() => { setActivesection(null); }}
            >
              Home
            </button>

            {/* Conditional Buttons for Logged In State */}
            {isLoggedIn ? (
              <button
                className="inline-flex items-center justify-center relative cursor-pointer select-none box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem] h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 transition-all duration-300"
                onClick={handleFormSubmission}
              >
                Start a Fundraiser
              </button>
            ) : null}

            {/* Help Button */}
            <button
              onClick={handleContactSupport}
              className="inline-flex items-center justify-center relative cursor-pointer select-none box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem] h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 transition-all duration-300"
            >
              Help
            </button>

            {/* Profile Button */}
            {isLoggedIn ? (
              <div>
                <button
                  className="inline-flex items-center justify-center relative cursor-pointer select-none box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem] h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 transition-all duration-300"
                  onClick={() => setisClicked(!isClicked)}
                >
                  Profile
                </button>
                {isClicked && (
                  <div className="absolute top-12 right-0 w-[300px] rounded-lg shadow-lg bg-[rgba(5,7,10,0.7)]">
                    <div ref={profileRef}>
                      <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setActivesection={setActivesection} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  className="inline-flex items-center justify-center relative cursor-pointer select-none box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem] h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 transition-all duration-300"
                  onClick={handleSignUp}
                >
                  Signup
                </button>
                <button
                  className="inline-flex items-center justify-center relative cursor-pointer select-none box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem] h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 transition-all duration-300"
                  onClick={handleLogin}
                >
                  LogIn
                </button>
              </>
            )}
            {/* Menu Button */}
            <div className="relative" ref={menuRef}>
              <button
                className="inline-flex items-center justify-center relative cursor-pointer select-none box-border font-medium leading-[1.75] min-w-[64px] bg-[color:var(--variant-textBg)] text-[0.8125rem] h-9 text-[rgb(245,246,250)] m-0 px-3 py-2 rounded-lg border-0 hover:bg-white/30 transition-all duration-300"
                onClick={toggleMenu}
              >
                Menu
              </button>
              {isMenuOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-2 text-gray-700 space-y-2">
                  <li>
                    <button
                      onClick={handleViewFundRaiser}
                      className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded-lg">
                      View Fundraisers
                    </button>
                  </li>
                  <li>

                    <button
                      onClick={handleInitiatives}
                      className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded-lg">
                      Initiatives
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleNgo}
                      className="w-full text-left hover:bg-gray-100 py-2 px-4 rounded-lg">
                      NGO's
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content Area with Scroll */}
      <div className="mt-20 bg-white flex-grow">
        {renderContent()}
      </div>

      {/* Sections Below the Main Content */}
      <div className=" overflow-y-auto">
        <Main setActivesection={setActivesection} />
        <Working />
        <Highlights />
        <Faqs />
        <Footer />
      </div>
    </div>

  )
}
export default Home;