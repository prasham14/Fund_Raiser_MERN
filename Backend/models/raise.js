const mongoose = require('mongoose');
const RaiseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  purpose: { type: String, required: true },
  funds: { type: Number, required: true },
  raised: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  type: { type: String },
});
module.exports = mongoose.model('Raise', RaiseSchema);

