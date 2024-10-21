const mongoose = require('mongoose');
const RaiseSchema = new mongoose.Schema({

  title: { type: String, required: true },
  details: { type: String, required: true },
  funds: { type: Number, required: true },
  raised: { type: Number, default: '0' },
  date: { type: Date, default: Date.now() },
  type: { type: String },
  // userId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
});


const Raise = mongoose.model('Raise', RaiseSchema);
module.exports = Raise;

// Raise.find()
//   .populate('userId')
//   .exec((err, raises) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(raises);
//     }
//   });