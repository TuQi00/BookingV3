const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  subservice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subservice",
    required: true,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  bookingStatus: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
});

BookingSchema.index({ date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model("Booking", BookingSchema);
