const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // Optional: Can be used for category image
});

module.exports = mongoose.model("Category", CategorySchema);
