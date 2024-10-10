const express = require('express');
const router = express.Router();
const Doc = require('../models/doc');
const multer = require('multer');
const { jwtAuthMiddleware } = require('../jwt');
const { signup, login, profile, editProfile, editEmail, emailVerify } = require('../controllers/user');
const User = require('../models/User')
const { transaction, payment, createOrder, verifyPayment } = require('../controllers/transaction');
const { donation } = require("../controllers/initiative");

//  documents
var path = require('path');


// Register new user
router.route('/signup').post(signup);
// Login user
router.post('/login', login);

// Raising fund


// router.route("/donation").post(donation);
// //  transaction
// router.route('/transaction').post(transaction);
// router.route('/payment').post(payment);
// router.route('/create-order').post(createOrder);
// router.route('/verify-payment').post(verifyPayment);
// //  Initiative

//  profile 


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  },
});

const upload = multer({ storage });

router.post('/uploadImage/:email', upload.single('profileImage'), async (req, res) => {
  const { username, email } = req.body;
  const profileImage = req.file.path;
  const user = new User({ username, email, profileImage });
  await user.save();
  return res.json({ message: 'Profile image uploaded successfully', user });
});



router.route("/UpdateName/:email").patch(editProfile);
// get profile
router.route("/getUser/:email").get(profile);
router.route('/user/EmailVerify/:email/:otp').patch(emailVerify);
router.route('/user/editEmail/:email').patch(editEmail);
module.exports = router;
