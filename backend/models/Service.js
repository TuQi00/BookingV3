const mongoose = require('mongoose');

// const SubserviceSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   price: { type: Number, required: true },
// });

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  // subservices: [SubserviceSchema],
});

module.exports = mongoose.model('Service', ServiceSchema);
