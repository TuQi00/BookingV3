const express = require('express');
const { createBooking, getAllBookings } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', createBooking);
router.get('/all-bookings', getAllBookings);

module.exports = router;
