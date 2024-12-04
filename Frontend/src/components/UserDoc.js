import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload, FaEye } from "react-icons/fa";

function UserDocuments({ isUser }) {
  const [documents, setDocuments] = useState([]);
  const [viewPdf, setViewPdf] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    fetchUserDocuments();
  }, []);
  const fundId = localStorage.getItem('selectedFundId')
  const fetchUserDocuments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/doc/get-user-files/${fundId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }

      });
      setDocuments(response.data.data);
    } catch (error) {
      console.error("Error fetching user documents:", error);
    }
  };


  const downloadDocument = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:5000/doc/download/${fileName}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: 'blob' // Important for handling file downloads
      });

      // Create a URL and download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // File name for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  return (

    <div className="documents-container max-w-lg md:max-w-2xl lg:max-w-4xl mx-auto p-4 sm:p-6 md:p-8 mt-12 rounded-lg">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 sm:mb-6 text-center">
        Documents
      </h2>
      {documents.length === 0 ? (
        <p className="text-gray-600 text-center">No documents uploaded yet.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {documents.map((doc) => (
              <li
                key={doc._id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div className="mb-4 sm:mb-0">
                  <p
                    className="font-semibold text-gray-800 text-sm sm:text-base truncate max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                    title={doc.title} // Tooltip for full title
                  >
                    {doc.title}
                  </p>
                  <p className="text-sm text-gray-600 truncate max-w-xs sm:max-w-sm">
                    {doc.pdf.length > 10 ? `${doc.pdf.slice(0, 20)}...` : (doc.pdf)}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() =>
                      setViewPdf(`http://localhost:5000/files/${doc.pdf}`)
                    }
                    className="btn btn-view text-blue-500 hover:text-blue-700 transition"
                  >
                    <FaEye size={20} />
                  </button>
                  <button
                    onClick={() => downloadDocument(doc.pdf)}
                    className="btn btn-download text-black hover:text-[#aa4528] transition"
                  >
                    <FaDownload size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {viewPdf && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 w-11/12 md:w-2/3 lg:w-1/2">
            <button
              onClick={() => setViewPdf(null)}
              className="text-red-500 font-bold mb-4"
            >
              Close
            </button>
            <iframe
              src={viewPdf}
              title="PDF Viewer"
              className="w-full h-72 sm:h-96 border rounded"
            ></iframe>
          </div>
        </div>
      )}
    </div>


  );
}

export default UserDocuments;
