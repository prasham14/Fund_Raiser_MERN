import React from 'react';
const NGO = () => {
  const links = [
    {
      id: 1,
      title: "Smile Foundaton",
      image: "https://www.smilefoundationindia.org/",
      url: "https://www.smilefoundationindia.org/"
    },
    {
      id: 2,
      title: "CRY (Child Rights and You)",
      image: "https://example.com/startup-india.jpg",
      url: "https://www.cry.org/"
    },
    {
      id: 3,
      title: "Give India Foundation  ",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://www.giveindia.org/"
    },
    {
      id: 4,
      title: "Goonj",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://goonj.org/"
    },
    {
      id: 5,
      title: "Nanhi Kali ",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://www.nanhikali.org/"
    },
    {
      id: 6,
      title: "Care India",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://careifoundation.org/"
    },
    {
      id: 7,
      title: "Helpage India",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://www.helpageindia.org/"
    },
    {
      id: 8,
      title: "Pratham",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://www.pratham.org/"
    },
    {
      id: 9,
      title: "Akshaya Patra Foundation",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://www.akshayapatra.org/"
    },
    {
      id: 10,
      title: "	Save the Children India",
      image: "https://example.com/swachh-bharat.jpg",
      url: "https://balrakshabharat.org/"
    },
    // Add more initiatives as needed
  ];


  return (
    <div className="min-h-screen bg-gray-100 py-8 pl-16 pr-8">
      {/* Title */}
      <h1 className="text-center text-4xl font-bold text-blue-600 mb-8">
        Here are the most popular NGO.s and foundations in India!
      </h1>

      {/* Grid Container */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>
        {links.map(link => (
          <div key={link.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
            <img src={link.image} alt={link.title} className="w-full h-48 object-cover" />
            <div className="p-4 text-center">
              <a href={link.url} target="_blank" rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-500 hover:text-blue-700">
                {link.title}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>




  );
};

export default NGO;
