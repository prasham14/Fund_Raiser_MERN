const express = require('express');
const router = express.Router();
const { getInitiatives, createInitiative } = require('../controllers/initiative');

router.route('/getinitiatives').get(getInitiatives);
router.route("/createInitiative").post(createInitiative);

module.exports = router;