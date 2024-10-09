const express = require('express');
const router = express.Router();
const Doc = require('../models/doc');
const multer = require('multer');
const { signup, login, profile, editProfile, editEmail, emailVerify } = require('../controllers/user');
const { transaction, payment, createOrder, verifyPayment } = require('../controllers/transaction');
const { createInitiative } = require("../controllers/initiative");
const { donation } = require("../controllers/initiative");

//  documents
var path = require('path');
const { jwtAuthMiddleware } = require('../jwt');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}filename`);
  },
})
const upload = multer({ storage });

router.post("/doc", upload.single('documents'), async (req, res) => {
  try {
    const { path, filename } = req.file;
    const documents = await Doc({
      path, filename
    })
    await documents.save();
    res.status(200).json({ response: "Document Uploaded" });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Register new user
router.route('/signup').post(signup);
// Login user
router.post('/login', login);

// Raising fund

// donation types
router.get("/option1", async (req, res) => {
  try {
    const educationFunds = await Raise.find({ type: 'Education' });
    res.json(educationFunds);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/option2", async (req, res) => {
  try {
    const educationFunds = await Raise.find({ type: 'Relief Fund' });
    res.json(educationFunds);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
})
router.get("/option3", async (req, res) => {
  try {
    const educationFunds = await Raise.find({ type: 'Medicine' });
    res.json(educationFunds);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
})

// router.route("/donation").post(donation);
// //  transaction
// router.route('/transaction').post(transaction);
// router.route('/payment').post(payment);
// router.route('/create-order').post(createOrder);
// router.route('/verify-payment').post(verifyPayment);
// //  Initiative
// router.route("/createInitiative").post(createInitiative);
//  profile 
router.route("/UpdateName/:email").patch(editProfile);
// get profile
router.route("/getUser/:email").get(profile);
router.route('/user/EmailVerify/:email/:otp').patch(emailVerify);
router.route('/user/editEmail/:email').patch(editEmail);
module.exports = router;
