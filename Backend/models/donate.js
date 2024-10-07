const mongoose = require('mongoose');
const DonateSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  accountno: {
    type: Number
  },
  amount: {
    type: Number
  }
});

const Donate = mongoose.model("Donate", DonateSchema);
module.exports = Donate;
