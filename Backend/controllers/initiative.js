const Initiative = require('../models/initiative');

async function createInitiative(req, res) {

  try {
    const data = req.body;
    const newIni = new Initiative(data);
    const response = await newIni.save();
    console.log("data saved");
    res.status(200).json({ response: response });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

async function getInitiatives(req, res) {
  try {
    const initiatives = await Initiative.find({});
    res.json(initiatives);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
}


module.exports = {
  createInitiative, getInitiatives
};