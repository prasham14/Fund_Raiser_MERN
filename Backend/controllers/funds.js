const Raise = require('../models/raise');
const User = require('../models/User');
async function raiseFund(req, res) {
  const { title, details, funds, raised, type, date } = req.body;

  try {
    const userId = req.user._id;
    const newRaise = new Raise({
      title,
      details,
      funds,
      raised,
      date,
      type,
      userId
    });
    const response = await newRaise.save();
    return res.status(201).json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
}

module.exports = {
  raiseFund
};