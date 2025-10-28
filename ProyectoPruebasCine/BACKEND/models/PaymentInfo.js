const mongoose = require('mongoose');

const paymentInfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
  billingAddress: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('PaymentInfo', paymentInfoSchema);
