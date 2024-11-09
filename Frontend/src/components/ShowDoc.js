import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import PdfComp from "./PdfComp";

function UserDocuments({ setActivesection }) {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUserDocuments();
  }, []);
  const userId = localStorage.getItem('userId');
  const fetchUserDocuments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-user-files/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDocuments(response.data.data);
    } catch (error) {
      console.error("Error fetching user documents:", error);
    }
  };

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
  };

  const handleBack = () => {
    setActivesection('option3');
  };

  const handleBackToList = () => {
    setSelectedDocument(null);
  };

  return (
    <div className="documents-container bg-gray-50 min-h-screen p-6 flex flex-col items-center">
      <button onClick={handleBack} className="self-start mb-4">
        <FaArrowLeft />
      </button>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        User Documents
      </h2>

      {!selectedDocument ? (
        <>
          {/* List of User's Documents */}
          {documents.length ? (
            <ul className="document-list w-full max-w-lg space-y-4">
              {documents.map((doc, index) => (
                <li
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center"
                >
                  <span className="text-lg font-medium text-gray-700">
                    {doc.title}
                  </span>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => handleDocumentClick(doc.fileUrl)}
                  >
                    View Document
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No documents available.</p>
          )}
        </>
      ) : (
        <>
          {/* Display Selected PDF Document */}
          <PdfComp pdfFile={selectedDocument} />
          <button
            onClick={handleBackToList}
            className="bg-gray-500 text-white py-2 px-4 rounded mt-4"
          >
            Back to Documents List
          </button>
        </>
      )}
    </div>
  );
}

export default UserDocuments;
