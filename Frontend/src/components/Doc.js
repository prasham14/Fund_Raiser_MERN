import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();
function App() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:5000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:5000/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status == "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };
  const showPdf = (pdf) => {
    // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`http://localhost:5000/files/${pdf}`)
  };
  return (
    <div className="App bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <form
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg"
        onSubmit={submitImage}
      >
        <h4 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Upload PDF in React
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

      <div className="uploaded mt-8 w-full max-w-lg">
        <h4 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Uploaded PDFs:
        </h4>

        <div className="output-div space-y-4">
          {allImage == null ? (
            <p className="text-gray-500 text-center">No PDFs uploaded yet.</p>
          ) : (
            allImage.map((data) => (
              <div
                key={data.title}
                className="inner-div bg-white shadow-md p-4 rounded-lg"
              >
                <h6 className="text-lg font-medium text-gray-700 mb-2">
                  Title: {data.title}
                </h6>
                <button
                  className="btn btn-primary bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                  onClick={() => showPdf(data.pdf)}
                >
                  Show PDF
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <PdfComp pdfFile={pdfFile} />

    </div>
  );
}

export default App;