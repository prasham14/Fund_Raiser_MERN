// donation types
const Raise = require('../models/raise')

async function option1(req, res) {
  try {
    const educationFunds = await Raise.find({ type: 'Education' });
    res.json(educationFunds);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function option2(req, res) {
  try {
    const educationFunds = await Raise.find({ type: 'Relief Fund' });
    res.json(educationFunds);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function option3(req, res) {
  try {
    const educationFunds = await Raise.find({ type: 'Medicine' });
    res.json(educationFunds);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = { option1, option2, option3 };