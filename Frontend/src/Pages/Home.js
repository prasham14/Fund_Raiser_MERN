import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Doc from '../components/Doc'
import FormSubmission from '../components/FundRaise';
import NGO from '../components/NGO';
import Option1 from '../components/Option1';
import Option2 from '../components/Option2';
import Option3 from '../components/Option3';
import ViewFundRaiser from '../components/ViewFundRaiser';
import MyInitiatives from '../components/MyInitiatives';
import MyFunds from '../components/MyFunds'
import CreateInitiative from '../components/CreateInitiative';
import Footer from '../components/Footer';
import Highlights from '../components/Highlights';
import Faqs from '../components/Faqs';
import SeeDetails from '../components/SeeDetails';
import ShowBankDetails from '../components/ShowBankDetails';
import Working from '../components/Working'
import NavBar from '../components/NavBar';
import im from '../components/images/OIP.jpeg'
import PaymentPage from '../components/PaymentPage';
import Others from '../components/Others'
const Home = () => {
  const [activeSection, setActivesection] = useState(null);
  const [isClicked, setisClicked] = useState(false);
  const [isFormClicked, setIsFormClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const navigate = useNavigate();
  function handleLogin() {

    navigate('/login');

  }
  function handleFormSubmission() {
    isLoggedIn ? (setActivesection('form')) : (navigate('/login'))
    setIsFormClicked(true);

  }

  const renderContent = () => {
    // If there's an active section, we render the component on top with a blurred background
    if (activeSection) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-center items-center">
          {renderActiveComponent()}
        </div>
      );
    }
  };


  useEffect(() => {
    const checkCookie = () => {
      // Check if the cookie is present
      const token = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('cookies='));
      console.log(token);
      if (!token) {
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', 'false');
        navigate('/');
      }
    };

    // Run `checkCookie` every minute (1 * 60 * 1000 ms)
    const interval = setInterval(checkCookie, 24 * 60 * 1000);

    // Cleanup interval on component unmount
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
      case 'getini': return (<MyInitiatives setActivesection={setActivesection} />);
      case 'myFunds': return (<MyFunds setActivesection={setActivesection} />);
      case 'seeDetails': return (<SeeDetails setActivesection={setActivesection} />);
      case 'pay': return (<PaymentPage />)
      case 'bankdetailsoffund': return (<ShowBankDetails setActivesection={setActivesection} />);
      case 'others': return (<Others setActivesection={setActivesection} />)
      default: return <div><Home /></div>;
    }
  };
  const handleClick = () => {
    navigate('/signup');
  };

  const handlePersonalDetails = () => {
    setActivesection('seeDetails')
  }
  // isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return (
    <div className="mt-0">
      <div className="mt-20 bg-white flex-grow">
        {renderContent()}
      </div>
      <div className="overflow-y-auto no-scrollbar">
        <div className="mt-[0px] flex-1">
          <NavBar setActivesection={setActivesection} />
          {/* <Main setActivesection={setActivesection} /> */}

          <div className="main-content flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-10">
            {/* Main Content */}
            <div className="flex flex-col md:flex-row items-center md:justify-between w-full max-w-7xl mx-auto">
              {/* Text Section */}
              <div className="text-center md:text-left max-w-3xl mb-12 px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-teal-600 mb-4">
                  Fundraising, Simplified
                </h1>

                <div>
                  <p className="text-gray-700 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    Create your fundraiser and rally support for your cause in just a few steps. Empower your community to make a difference.
                  </p>
                  {
                    isLoggedIn ? (<button className='bg-teal-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105 mb-10' onClick={isLoggedIn ? (handleFormSubmission) : (handleLogin)}>
                      Start a Fund Raiser Now!
                    </button>) : (
                      <button onClick={handleLogin} className='bg-teal-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105 mb-10'>Login Now for raising Funds at 0 cost</button>
                    )
                  }

                </div>

                {isLoggedIn ? (
                  <div className="flex flex-col items-center md:items-start space-y-4">
                    <p className="text-gray-600 text-lg">
                      Make sure to add your personal details so that people can reach you easily.
                    </p>
                    <button
                      onClick={handlePersonalDetails}
                      className="bg-teal-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Add Personal Details
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleClick}
                    className="bg-teal-500 text-white py-3 px-10 rounded-full shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Get Started Now
                  </button>
                )}
              </div>

              {/* Image Section */}
              <div className="bg-no-repeat mt-0 bg-right-top -top-12 h-[500px] md:h-[600px] max-h-[500px] bg-[length:40%] flex flex-col">
                <img
                  src={im}
                  alt="Fundraising"
                  className="h-[70vh] md:h-[90vh] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Slider Section */}
            <div className="w-full max-w-5xl overflow-hidden mt-10">
              <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full sm:w-80 h-[350px] bg-gray-200 rounded-lg overflow-hidden shadow-lg snap-center transform transition-transform duration-300 ease-in-out hover:scale-105"
                  >
                    <img
                      src={`./images/-${index}.jpg`} // replace with actual image paths
                      alt={`Slide ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="inline-flex items-center justify-center w-full my-8">
              {/* Left Line */}
              <hr className="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />

              {/* Dots */}
              <div className="flex items-center justify-center space-x-2 mx-4">
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              </div>
              {/* Right Line */}
              <hr className="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
          </div>

          <div className="mt-0">
            <Working />
            <Highlights />
            <Faqs />
            <Footer />
          </div>
        </div>
      </div>
    </div>


  )
}
export default Home;