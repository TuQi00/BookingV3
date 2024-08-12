const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  availability: [
    {
      date: { type: Date, required: true },
      available: { type: Boolean, default: true },
    },
  ],
});

module.exports = mongoose.model('Employee', EmployeeSchema);
