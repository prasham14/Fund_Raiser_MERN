const mongoose = require('mongoose');
const InitiativeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  purpose: { type: String, required: true },
  date: { type: Date, default: Date.now },
  desc: { type: String },  // Path to the document file
  email: { type: String, required: true },
  phone: { type: Number }
});
const Initiative = mongoose.model('Initiative', InitiativeSchema);

module.exports = Initiative;