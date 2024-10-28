import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
const Help = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/')
  }
  return (
    <div class="bg-gray-100 py-16">
      <button onClick={handleBack}> <FaArrowLeft /></button>

      <div class="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-10 md:p-14">
        <header class="text-center mb-12">
          <h1 class="text-4xl font-extrabold text-blue-700">Welcome to Our Fundraising Platform</h1>
          <p class="mt-4 text-lg text-gray-600 leading-relaxed">
            Empowering You to Create Positive Change
          </p>
        </header>

        <section class="description mb-10">
          <h2 class="text-3xl font-semibold text-blue-700 mb-6">About Us</h2>
          <p class="text-gray-700 mb-4 leading-relaxed">
            Our fundraising platform is dedicated to helping individuals, charities, and organizations raise funds for causes that matter.
            Whether you are raising money for medical expenses, education, community projects, or disaster relief, we provide a secure and
            reliable platform for you to create and manage your fundraising campaigns.
          </p>
          <p class="text-gray-700 leading-relaxed">
            We believe in the power of collective action. With our easy-to-use tools, you can start a fundraiser in minutes, share it with
            your network, and inspire others to support your cause. From small personal projects to large-scale community drives, we are
            here to help you every step of the way.
          </p>
        </section>

        <section class="features mb-12">
          <h2 class="text-3xl font-semibold text-blue-700 mb-6">Why Choose Us?</h2>
          <ul class="list-disc list-inside text-gray-700 space-y-3 pl-4">
            <li class="flex items-center">
              <span class="mr-2">✔️</span> Secure payment gateway to protect your donations
            </li>
            <li class="flex items-center">
              <span class="mr-2">✔️</span> Real-time campaign tracking and analytics
            </li>
            <li class="flex items-center">
              <span class="mr-2">✔️</span> Easy social media sharing to reach a wider audience
            </li>
            <li class="flex items-center">
              <span class="mr-2">✔️</span> 24/7 support to assist with any questions or issues
            </li>
          </ul>
        </section>

        <footer class="footer text-center mt-10">
          <h2 class="text-3xl font-semibold text-blue-700 mb-6">Contact Us</h2>
          <p class="text-gray-700 mb-2">
            Email: <a href="mailto:jprasham3@gmail.com" class="text-teal-600 hover:underline">jprasham3@gmail.com</a>
          </p>
          <p class="text-gray-700 mb-2">
            Phone: <span class="text-teal-600">+91 8209871857</span>
          </p>
          <p class="text-gray-700 mb-2">Rajasthan, India</p>
          <p class="text-gray-700 mt-6">Follow us on:</p>

          <div class="flex justify-center space-x-8 mt-4">
            <a href="#" target="_blank" class="text-teal-600 hover:text-teal-800 transition duration-200 flex items-center space-x-2">
              <span class="material-icons">facebook</span><span>Facebook</span>
            </a>
            <a href="#" target="_blank" class="text-teal-600 hover:text-teal-800 transition duration-200 flex items-center space-x-2">
              <span class="material-icons">instagram</span><span>Instagram</span>
            </a>
            <a href="#" target="_blank" class="text-teal-600 hover:text-teal-800 transition duration-200 flex items-center space-x-2">
              <span class="material-icons">twitter</span><span>Twitter</span>
            </a>
          </div>
        </footer>
      </div>
    </div>


  )
}

export default Help
