const express = require('express');
const router = express.Router();
const multer = require("multer");
const mongoose = require('mongoose');

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

router.post("/upload-files/:id", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  const userid = req.params;
  try {
    await PdfSchema.create({ title: title, pdf: fileName, id: userid });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

router.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) { }
});

module.exports = router;
