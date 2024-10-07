const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
  senderBank: String,
  receiverBank: String,
  accountNumber: String,
  receiverAccountNumber: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;