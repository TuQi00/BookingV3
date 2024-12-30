const Booking = require("../models/Booking");
const Employee = require("../models/Employee");
const Subservice = require("../models/Subservice");
const Service = require("../models/Service");
const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

// Create a new booking
exports.createBooking = asyncHandler(async (req, res) => {
  const { service, subservice, employee, date, time, email } = req.body;

  // Validate input
  if (!service || !subservice || !employee || !date || !time || !email) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ msg: "User  not found. Please register first." });
  }

  // Fetch related documents
  const serviceDoc = await Service.findById(service);
  const subserviceDoc = await Subservice.findById(subservice);
  const employeeDoc = await Employee.findById(employee);

  // Check for existing bookings
  const existingBooking = await Booking.findOne({ employee, date, time });
  if (existingBooking) {
    return res.status(400).json({
      msg: "This time slot is already booked for the selected employee.",
    });
  }

  // Create a new booking
  const booking = new Booking({
    user: user._id,
    service: serviceDoc._id,
    subservice: subserviceDoc._id,
    employee: employeeDoc._id,
    date,
    time,
  });

  const savedBooking = await booking.save();

  // Update user's bookings
  user.bookings.push(savedBooking._id);
  await user.save();

  // Return booking details with names
  res.status(201).json({
    success: true,
    booking: {
      id: savedBooking._id,
      service: serviceDoc.name, // Lấy tên dịch vụ
      subservice: subserviceDoc.name, // Lấy tên subservice
      employee: employeeDoc.name, // Lấy tên nhân viên
      date,
      time,
    },
  });
});

// Get session data (not needed anymore, since we're passing data directly)
exports.getSessionData = async (req, res) => {
  if (req.session && req.session.booking) {
    try {
      res.json(req.session.booking);
    } catch (err) {
      console.error("Error fetching session data:", err);
      res.status(500).json({ msg: "Error fetching session data." });
    }
  } else {
    res.status(404).json({ msg: "No booking data found in session." });
  }
};
