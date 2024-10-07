import React from 'react'
import image from "./images/images.jpeg";
import image1 from "./images/images (1).jpeg";
import image2 from "./images/images (2).jpeg";
const Main = () => {
  return (
    <div>
      <div className="main-content flex-1 ml-64 mt-16 p-12 bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Welcome! Want to raise funds? We've got you covered.
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Sign up today to create your fundraiser and start collecting support from people who care.
          </p>
          <div className="image-container mb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Image 1 */}
            <div className="relative group">
              <img
                src={image}
                alt="Fundraiser"
                className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl border-2 border-transparent group-hover:border-teal-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 ease-in-out rounded-lg"></div>
              <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              </div>
            </div>

            {/* Image 2 */}
            <div className="relative group">
              <img
                src={image1}
                alt="Community Support"
                className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl border-2 border-transparent group-hover:border-teal-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 ease-in-out rounded-lg"></div>
              <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              </div>
            </div>
            <div className="relative group">
              <img
                src={image1}
                alt="Community Support"
                className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl border-2 border-transparent group-hover:border-teal-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 ease-in-out rounded-lg"></div>
              <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              </div>
            </div>
            <div className="relative group">
              <img
                src={image1}
                alt="Community Support"
                className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl border-2 border-transparent group-hover:border-teal-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 ease-in-out rounded-lg"></div>
              <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              </div>
            </div>
            <div className="relative group">
              <img
                src={image1}
                alt="Community Support"
                className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl border-2 border-transparent group-hover:border-teal-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 ease-in-out rounded-lg"></div>
              <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              </div>
            </div>
            {/* Image 3 */}
            <div className="relative group">
              <img
                src={image2}
                alt="Charity Event"
                className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-xl border-2 border-transparent group-hover:border-teal-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 ease-in-out rounded-lg"></div>
              <div className="absolute inset-0 flex justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Main
