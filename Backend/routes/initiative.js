const express = require('express');
const router = express.Router();
const { getInitiatives, createInitiative, getInitiativesByEmail, editInitiatives } = require('../controllers/initiative');

router.route('/getinitiatives').get(getInitiatives);
router.route("/createInitiative/:email").post(createInitiative);
router.route("/getInitiative/:email").get(getInitiativesByEmail);
router.route('/editInitiative/:id').put(editInitiatives)
module.exports = router;