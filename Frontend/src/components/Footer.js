import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; // Social media icons

const Footer = () => {
  return (
    <footer className="bg-[#001512] text-white py-10 border-t-2 border-gray-600">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400 leading-relaxed">
              We are committed to empowering communities by connecting those in need with generous donors. Our platform makes it simple to raise and donate funds, fostering positive change one contribution at a time.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline text-gray-400">Home</a></li>
              <li><a href="/dashboard" className="hover:underline text-gray-400">Dashboard</a></li>
              <li><a href="/fundraiser/start" className="hover:underline text-gray-400">Start a Fundraiser</a></li>
              <li><a href="/funds" className="hover:underline text-gray-400">View Fundraisers</a></li>
              <li><a href="/support" className="hover:underline text-gray-400">Help & Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">Email: <a href="mailto:jprasham3@gmail.com" className="text-teal-500 hover:underline">jprasham3@gmail.com</a></p>
            <p className="text-gray-400">Phone: <span className="text-teal-500">+91 8209871857</span></p>
            <p className="text-gray-400">Rajasthan, India</p>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400">&copy; 2024 Fundraiser Platform. All Rights Reserved.</p>

          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
