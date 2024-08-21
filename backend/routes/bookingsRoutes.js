const express = require("express");
const {
  createBooking,
  getAllBookings,
} = require("../controllers/bookingController");
const { checkAndCreateUser } = require("../middleware/checkAndCreateUser");
const router = express.Router();

router.post("/", checkAndCreateUser, createBooking);
router.get("/all-bookings", getAllBookings);

module.exports = router;
