const User = require("../models/User");

const checkInvalidEmail = (key = "body") => {
  return (req, res, next) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = req[key]?.email;

    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    next();
  };
};

// Check and create user
const checkAndCreateUser = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    } else {
      console.log("User found:", user);
    }

    req.user = user;
    console.log("User attached to req:", req.user);
    next();
  } catch (error) {
    console.error("Error in checkAndCreateUser:", error.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Check employee availability
const checkEmployeeAvailability = async (req, res, next) => {
  const { employee, date, time } = req.body;

  const existingBooking = await Booking.findOne({ employee, date, time });
  if (existingBooking) {
    return res.status(400).json({
      success: false,
      message: "Employee is already booked at this time.",
    });
  }

  next();
};
const getUserByEmail = async (req, res) => {
  const user = await User.findOne({ email: req.params.email }).populate(
    "bookings"
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

module.exports = {
  checkInvalidEmail,
  checkAndCreateUser,
  checkEmployeeAvailability,
  getUserByEmail,
};
