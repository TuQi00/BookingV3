const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true }, // Added price
  category: {
    // Updated from 'service' to 'category'
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: { type: String }, // Optional: Can be used for service image
});

module.exports = mongoose.model("Service", ServiceSchema);
