const mongoose = require('mongoose');
const DocSchema = mongoose.Schema({
  path: { type: String, required: true },
  filename: { type: String, required: true },

});

const Doc = mongoose.model('Docs', DocSchema);
module.exports = Doc;