const express = require('express');
const router = express.Router();
const { raiseFund } = require('../controllers/funds');

router.route('/raise').post(raiseFund);
module.exports = router;
