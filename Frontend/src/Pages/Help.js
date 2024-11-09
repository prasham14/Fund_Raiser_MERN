import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // Updated icons

const Help = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className=" bg-gradient-to-br from-[#001512] to-[#00393c] shadow-lg rounded-lg p-10 md:p-14 py-16">
      <button onClick={handleBack} className="text-teal-500 hover:text-white transition duration-200">
        <FaArrowLeft />
      </button>
      {/* /*<div className="max-w-6xl mx-auto bg-gradient-to-br from-[#001512] to-[#00393c] shadow-lg rounded-lg p-10 md:p-14">*/}
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-teal-500">Welcome to Our Fundraising Platform</h1>
        <p className="mt-4 text-lg text-white leading-relaxed">
          Empowering Positive Change, One Fundraiser at a Time
        </p>
      </header>

      {/* About Us Section */}
      <section className="description mb-10">
        <h2 className="text-3xl font-semibold text-teal-500 mb-6">About Us</h2>
        <p className="text-white mb-4 leading-relaxed">
          Our platform is dedicated to helping individuals, charities, and organizations raise funds for impactful causes.
          Whether you're funding medical treatment, education, community initiatives, or disaster relief, our platform offers a secure and
          efficient way to start and manage your fundraiser.
        </p>
        <p className="text-white leading-relaxed">
          We believe in the strength of community and collective action. With our simple tools, you can launch a fundraiser in minutes,
          share it widely, and rally support for your cause. From personal goals to large community projects, we’re here to support your journey.
        </p>
      </section>

      {/* Features Section */}
      <section className="features mb-12">
        <h2 className="text-3xl font-semibold text-teal-500 mb-6">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-white space-y-3 pl-4">
          <li className="flex items-center">
            <span className="mr-2">✔️</span> Secure and reliable payment processing for donations
          </li>
          <li className="flex items-center">
            <span className="mr-2">✔️</span> Real-time tracking and analytics for campaigns
          </li>
          <li className="flex items-center">
            <span className="mr-2">✔️</span> Easy social sharing tools to reach more donors
          </li>
          <li className="flex items-center">
            <span className="mr-2">✔️</span> 24/7 support to assist with your fundraising needs
          </li>
        </ul>
      </section>

      {/* Contact Us Section */}
      <footer className="footer text-center mt-10">
        <h2 className="text-3xl font-semibold text-teal-500 mb-6">Contact Us</h2>
        <p className="text-white mb-2">
          Email: <a href="mailto:jprasham3@gmail.com" className="text-teal-600 hover:underline">jprasham3@gmail.com</a>
        </p>
        <p className="text-white mb-2">
          Phone: <span className="text-teal-600">+91 8209871857</span>
        </p>
        <p className="text-white mb-2">Rajasthan, India</p>
        <p className="text-white mt-6">Follow us on:</p>

        <div className="flex justify-center space-x-8 mt-4">
          <a href="#" target="_blank" className="text-teal-600 hover:text-teal-800 transition duration-200 flex items-center space-x-2">
            <FaFacebook /><span>Facebook</span>
          </a>
          <a href="#" target="_blank" className="text-teal-600 hover:text-teal-800 transition duration-200 flex items-center space-x-2">
            <FaInstagram /><span>Instagram</span>
          </a>
          <a href="#" target="_blank" className="text-teal-600 hover:text-teal-800 transition duration-200 flex items-center space-x-2">
            <FaTwitter /><span>Twitter</span>
          </a>
        </div>
      </footer>
      {/* </div> */}
    </div>
  )
}

export default Help;
