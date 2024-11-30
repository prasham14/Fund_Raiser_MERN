import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
function UserDocuments({ isUser }) {
  const [documents, setDocuments] = useState([]);
  const [viewPdf, setViewPdf] = useState(null);
  const token = localStorage.getItem('token'); // Auth token
  // const userId = localStorage.getItem('userId')
  useEffect(() => {
    fetchUserDocuments();
  }, []);
  const fundId = localStorage.getItem('selectedFundId')
  const fetchUserDocuments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/get-user-files/${fundId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }

      });
      console.log(response);
      setDocuments(response.data.data);
    } catch (error) {
      console.error("Error fetching user documents:", error);
    }
  };
  // const handleDeleteDoc = async () => {
  //   try {
  //     await axios.delete(`http://localhost:5000/delete/${pdfId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }

  //     });

  //   } catch (error) {
  //     console.error("Error fetching user documents:", error);
  //   }
  // }

  // const downloadDocument = (fileName) => {
  //   window.open(`http://localhost:5000/download/${fileName}`, "_blank", {
  //     headers: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  // };
  // useEffect(() => {
  //   fetchUserDocuments();
  // }, [fundId]);
  const downloadDocument = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:5000/download/${fileName}`, {
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
  // downloadDocument = async (fileName) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/download/${fileName}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       responseType: 'blob',
  //     });
  //     // Download logic
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   }
  // };

  return (
    <div className="documents-container max-w-lg mx-auto bg-white p-8 shadow-lg mt-12 rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Your Uploaded Documents
      </h2>
      {documents.length === 0 ? (
        <p className="text-gray-600 text-center">No documents uploaded yet.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {documents.map((doc) => (

              <li
                key={doc._id}
                className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <div>
                  <h3 className="font-semibold text-gray-800">{doc.title}</h3>
                  <p className="text-sm text-gray-600">{doc.pdf}</p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setViewPdf(`http://localhost:5000/files/${doc.pdf}`)}
                    className="btn btn-view text-blue-500 hover:text-blue-700 transition"
                  >
                    <FaEye size={20} />
                  </button>
                  <button
                    onClick={() => downloadDocument(doc.pdf)}
                    className="btn btn-download text-green-500 hover:text-green-700 transition"
                  >
                    <FaDownload size={20} />
                  </button>
                  {/* <button onClick={handleDeleteDoc}>
                    <MdDelete />
                  </button> */}

                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {viewPdf && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2">
            <button
              onClick={() => setViewPdf(null)}
              className="text-red-500 font-bold mb-4"
            >
              Close
            </button>
            <iframe
              src={viewPdf}
              title="PDF Viewer"
              className="w-full h-96 border rounded"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDocuments;
