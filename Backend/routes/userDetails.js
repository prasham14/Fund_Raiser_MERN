const express = require('express');
const router = express.Router();
const { fillDetails, getUserDetailsById, getUserDetails, updateUserDetails } = require('../controllers/userDetails');

router.route('/fill').post(fillDetails);
router.route("/getUserDetails/:user_id").get(getUserDetailsById);

module.exports = router;
