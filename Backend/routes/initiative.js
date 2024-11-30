const express = require('express');
const router = express.Router();
const { getInitiatives, createInitiative, getInitiativesByEmail, editInitiatives, deleteInitiative } = require('../controllers/initiative');

router.route('/getinitiatives').get(getInitiatives);
router.route("/createInitiative/:email").post(createInitiative);
router.route("/getInitiative/:email").get(getInitiativesByEmail);
router.route('/editInitiative/:id').put(editInitiatives)
router.delete('/deleteInitiative/:id', deleteInitiative);
module.exports = router;