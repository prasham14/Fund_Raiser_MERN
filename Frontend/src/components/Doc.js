import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
function App({ activeSection, setActivesection }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
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

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append('userId', userId);
    console.log(title, file, userId);

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
      console.log(result);
      if (result.data.status == "ok") {
        alert("Uploaded Successfully!!!");
        getPdf();
      }
      setActivesection('main');
    }

    catch (err) {
      console.log(err);
    }

  };
  return (
    <div className="App bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <form
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg"
        onSubmit={submitImage}
      >
        <h4 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Upload the documents for verifications (the Pdf will be visible to Donor)
        </h4>

        <div className="mb-4">
          <input
            type="text"
            className="form-control w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="file"
            className="form-control w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept="application/pdf"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="text-center">
          <button
            className="btn btn-primary bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;