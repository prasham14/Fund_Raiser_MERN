const Raise = require('../models/Raise');
const User = require('../models/User');

async function raiseFund(req, res) {
  const { title, details, funds, raised, type, date, user_id } = req.body;
  // const user_id = req.params.id;
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



async function getFundsById(req, res) {
  const userId = req.params.user_id;
  console.log(`Fetching funds for user ID: ${userId}`);

  try {
    const funds = await Raise.find({ userId: userId });

    if (!funds.length) {
      return res.status(404).json({ message: "No funds found for this user." });
    }

    console.log(funds);
    return res.json(funds);
  } catch (err) {
    console.error("Error fetching funds:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}


async function editFunds(req, res) {
  const id = req.params.id;
  console.log(id);
  const updatedData = req.body;
  try {
    const response = await Raise.findByIdAndUpdate(id,
      updatedData,
      {
        new: true,
        runValidators: true
      });
    console.log(response);
    return res.json({
      success: true,
      message: "success",
      response: response
    })
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  raiseFund, getFundsById, editFunds
};
