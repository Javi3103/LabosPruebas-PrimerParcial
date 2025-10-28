const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movie: { type: String, required: true },
  quantity: { type: Number, required: true },
  selectedSeats: { type: [String], required: true },
  total: { type: Number, required: true },
  time: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Purchase', purchaseSchema);
