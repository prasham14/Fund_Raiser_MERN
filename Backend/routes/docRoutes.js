const express = require('express');
const router = express.Router();
const multer = require("multer");
const mongoose = require('mongoose');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

require("../models/doc");
const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage });

router.post("/upload-files/:userId", upload.single("file"), async (req, res) => {
  try {
    console.log(req.file); // Log the uploaded file for debugging
    const { title, fundId } = req.body; // Extract title from the request body
    const fileName = req.file.filename; // Extract filename from uploaded file
    const userId = req.params.userId; // Extract userId from the route parameters
    // Create and save the document in the database
    const newPdf = await PdfSchema.create({
      title: title,
      pdf: fileName,
      userId: userId,
      fundId: fundId
    });
    console.log("Saving document:", { title, pdf: fileName, userId, fund: fundId });
    res.send({ status: "ok", data: newPdf }); // Send success response
  } catch (error) {
    console.error("Error saving PDF details:", error); // Log error for debugging
    res.status(500).json({ status: "error", message: "Failed to upload file", error: error.message });
  }
});


router.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
      console.log(res.data);
    });
  } catch (error) { }
});


router.get("/get-user-files/:fundId", async (req, res) => {
  // const userId = req.params.userId;
  const fundId = req.params.fundId;
  try {
    const userDocuments = await PdfSchema.find({ fundId }); // Replace `Document` with your model
    res.json({ data: userDocuments });
    console.log(userDocuments);
    // console.log(res);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user documents" });
  }
});



//  for shwoing docs and downloading 
router.get('/download/:fileName', (req, res) => {
  const filePath = path.join(process.cwd(), 'files', req.params.fileName);
  // Ensure correct path
  console.log(filePath)
  res.download(filePath, req.params.fileName, (err) => {
    if (err) {
      console.error(err); // Log the error for debugging
      res.status(500).send({ error: "Error downloading file" });
    }
  });
});
router.delete('/delete/:pdfId', async (req, res) => {
  const { pdfId } = req.params;

  try {
    const result = await PdfDetails.findByIdAndDelete(pdfId);

    if (!result) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    res.status(200).json({ message: 'PDF deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;