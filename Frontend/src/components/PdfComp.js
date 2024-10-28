import { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfComp({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-div">
      <p>Page {pageNumber} of {numPages}</p>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.from({ length: numPages }, (_, i) => (
          <Page key={i} pageNumber={i + 1} renderTextLayer={false} renderAnnotationLayer={false} />
        ))}
      </Document>
    </div>
  );
}

export default PdfComp;
