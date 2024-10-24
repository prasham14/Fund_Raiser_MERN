const Raise = require('../models/Raise');
const User = require('../models/User');

async function raiseFund(req, res) {
  const { title, details, funds, raised, type, date, user_id } = req.body;
  console.log(details, funds);
  try {
    const user = await User.findById(user_id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const newRaise = new Raise({
      title,
      details,
      funds,
      raised,
      date,
      type,
      userId: user_id
    });

    const response = await newRaise.save();
    return res.status(201).json(response);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: 'Server error' });
  }
}

module.exports = {
  raiseFund
};
