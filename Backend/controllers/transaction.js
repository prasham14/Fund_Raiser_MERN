// const Transaction = require('../models/transaction')
// const Razorpay = require('razorpay');

// async function transaction(req, res) {

//   const { senderBank, receiverBank, accountNumber, receiverAccountNumber, amount } = req.body;

//   const transaction = new Transaction({
//     senderBank,
//     receiverBank,
//     accountNumber,
//     receiverAccountNumber,
//     amount,
//   });

//   try {
//     await transaction.save();
//     res.status(201).json({ message: 'Transaction successful!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Error saving transaction' });
//   }
// }


// async function payment(req, res) {
//   const { amount } = req.body; // Amount in cents (or the smallest currency unit)

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'inr', // Change this to the currency you want
//       payment_method_types: ['card'],
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }

// }


// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });



// async function createOrder(req, res) {
//   const options = {
//     amount: req.body.amount, // amount in paise
//     currency: 'INR',
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }


// async function verifyPayment(req, res) {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//   const body = razorpay_order_id + '|' + razorpay_payment_id;
//   const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
//     .update(body.toString())
//     .digest('hex');

//   if (expectedSignature === razorpay_signature) {
//     // Payment is verified
//     res.json({ success: true });
//   } else {
//     // Payment verification failed
//     res.status(400).json({ success: false });
//   }
// }


// module.exports = {
//   transaction, payment, createOrder, verifyPayment
// };