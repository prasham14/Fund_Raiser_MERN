import React from 'react'
const Help = () => {
  return (
    <div class="bg-gray-100 py-12">
      <div class="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-8 md:p-12">
        <header class="text-center mb-10">
          <h1 class="text-4xl font-extrabold text-gray-800">Welcome to Our Fundraising Platform</h1>
          <p class="mt-3 text-lg text-gray-600">Empowering You to Create Positive Change</p>
        </header>

        <section class="description mb-8">
          <h2 class="text-3xl font-semibold text-gray-800 mb-4">About Us</h2>
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

        <section class="features mb-8">
          <h2 class="text-3xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
          <ul class="list-disc list-inside text-gray-700 space-y-2">
            <li>✔️ Secure payment gateway to protect your donations</li>
            <li>✔️ Real-time campaign tracking and analytics</li>
            <li>✔️ Easy social media sharing to reach a wider audience</li>
            <li>✔️ 24/7 support to assist with any questions or issues</li>
          </ul>
        </section>

        <footer class="footer text-center mt-8">
          <h2 class="text-3xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p class="text-gray-700">Email: <a href="mailto:jprasham3@gmail.com" class="text-teal-600 hover:underline">jprasham3@gmail.com</a></p>
          <p class="text-gray-700">Phone: <span class="text-teal-600">+91 8209871857</span></p>
          <p class="text-gray-700">Rajasthan, India</p>
          <p class="text-gray-700">Follow us on:</p>
          <div class="flex justify-center space-x-6 mt-2">
            <a href="#" target="_blank" class="text-teal-600 hover:text-teal-800 transition duration-200">Facebook</a>
            <a href="#" target="_blank" class="text-teal-600 hover:text-teal-800 transition duration-200">Instagram</a>
            <a href="#" target="_blank" class="text-teal-600 hover:text-teal-800 transition duration-200">Twitter</a>
          </div>
        </footer>
      </div>
    </div>


  )
}

export default Help
