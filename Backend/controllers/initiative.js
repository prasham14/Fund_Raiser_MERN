const Initiative = require('../models/initiative');
const User = require('../models/User');
async function createInitiative(req, res) {
  const { title, purpose, date, desc, phone } = req.body;
  const emailId = req.params.email;
  try {

    const user = await User.findOne({ email: emailId });
    console.log(user);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Creating a new Initiative with the correct email field
    const newIni = new Initiative({
      title, purpose, date, desc, phone, email: emailId
    });

    // Saving the new Initiative
    const response = await newIni.save();
    return res.status(201).json(response);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getInitiatives(req, res) {
  try {
    const data = req.body;
    const initiatives = await Initiative.find(data);
    res.json(initiatives);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getInitiativesByEmail(req, res) {


  const emailId = req.params.email;

  try {
    const initiatives = await Initiative.find({ email: emailId });
    return res.json(initiatives);

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createInitiative, getInitiatives, getInitiativesByEmail
};