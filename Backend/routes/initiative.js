const express = require('express');
const router = express.Router();
const { getInitiatives, createInitiative, getInitiativesByEmail } = require('../controllers/initiative');

router.route('/getinitiatives').get(getInitiatives);
router.route("/createInitiative/:email").post(createInitiative);
router.route("/getInitiative/:email").get(getInitiativesByEmail);
module.exports = router;