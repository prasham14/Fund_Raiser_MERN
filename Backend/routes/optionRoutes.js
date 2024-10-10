const express = require('express');
const router = express.Router();



const { option1, option2, option3 } = require('../controllers/options');
router.route('/option1').get(option1);
router.route('/option2').get(option2);
router.route('/option3').get(option3);


module.exports = router;