const express = require('express');
const router = express.Router();
const { raiseFund, getFundsById, editFunds, activeFunds } = require('../controllers/funds');

router.route('/raise').post(raiseFund);
router.route("/getFunds/:user_id").get(getFundsById);
router.route('/editFund/:id').put(editFunds);
router.route('/active-fundraisers').get(activeFunds);
module.exports = router;
