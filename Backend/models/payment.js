const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  date: { type: Date, default: Date.now },
  fundId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'raise', // Assuming 'Raise' is your fundraiser model
    required: true,
    unique: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming 'User' is your user model
    required: true,
    unique: false
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
