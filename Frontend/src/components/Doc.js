import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp"; // Import PdfComp component
import { FaArrowLeft } from "react-icons/fa";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App({ activeSection, setActivesection }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null); // PDF for viewing
  const [selectedFundPdf, setSelectedFundPdf] = useState(null); // State to track selected PDF
  const [userId, setUserID] = useState(localStorage.getItem('userId'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/get-files", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const handleDocument = (pdf) => {
    setSelectedFundPdf(pdf); // Set the selected PDF for viewing
  };
  const handleBack = () => {
    setActivesection('form')
  }
  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append('userId', userId);

    try {
      const result = await axios.post(
        `http://localhost:5000/upload-files/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`
          }
        }
      );
      if (result.data.status === "ok") {
        alert("Uploaded Successfully!!!");
        getPdf();
      }
      alert('Document uploaded Successfully')
      setActivesection('main');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App bg-gray-50 min-h-screen flex flex-col items-center justify-center">


      {!selectedFundPdf ? (
        <>
          <form
            className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg"
            onSubmit={submitImage}
          >
            {/* Header Information */}
            <h4 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              <button onClick={handleBack}>
                <FaArrowLeft />
              </button>
              Upload Verification Documents
            </h4>
            <p className="text-gray-600 mb-6 text-center">
              Provide documentation to validate this fundraiser. These documents will be accessible to donors.
            </p>

            {/* Input for Document Title */}
            <input
              type="text"
              className="form-control w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Document Title (e.g., Medical Certificate)"
              required
              onChange={(e) => setTitle(e.target.value)}
            />

            {/* File Upload for Document */}
            <input
              type="file"
              className="form-control w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5 mb-5"
              accept="application/pdf"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />

            {/* Submit Button */}
            <button
              className="btn btn-primary bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
              type="submit"
            >
              Upload Document
            </button>
          </form>
        </>
      ) : (
        <PdfComp pdfFile={selectedFundPdf} />
      )}
    </div>

  );
}

export default App;
