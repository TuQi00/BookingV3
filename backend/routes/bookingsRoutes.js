const express = require("express");
const {
  createBooking,
  getSessionData,
} = require("../controllers/bookingController");
const {
  checkInvalidEmail,
  checkAndCreateUser,
} = require("../middleware/checkEveryThing");

const router = express.Router();

// Đảm bảo sử dụng `checkInvalidEmail("body")` và `checkAndCreateUser` đúng cách
router.post("/", checkInvalidEmail("body"), checkAndCreateUser, createBooking);
// router.get("/session", getSessionData);

module.exports = router;
