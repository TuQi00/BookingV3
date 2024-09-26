const express = require("express");
const {
  createBooking,
  getAllBookings,
  getAvailableEmployees,
  updateBooking,
} = require("../controllers/bookingController");
const { checkAndCreateUser } = require("../middleware/checkAndCreateUser");
const router = express.Router();

router.post("/", checkAndCreateUser, createBooking);
router.post("/:id", updateBooking);
router.get("/all-bookings", getAllBookings);
router.post("/available-employees", getAvailableEmployees);

module.exports = router;
