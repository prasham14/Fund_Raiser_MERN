const express = require('express');
const router = express.Router();
const { raiseFund, getFundsById, editFunds } = require('../controllers/funds');

router.route('/raise').post(raiseFund);
router.route("/getFunds/:user_id").get(getFundsById);
router.route('/editFund/:id').put(editFunds)
module.exports = router;
