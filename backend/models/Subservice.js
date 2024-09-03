const mongoose = require('mongoose');

const SubserviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' } // Tham chiếu đến Service
});

module.exports = mongoose.model('Subservice', SubserviceSchema);
