const Booking = require('../models/Booking');
const Service = require('../models/Service');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
  const { service, subservice, employee, date, time, email } = req.body;

  if (!service || !subservice || !employee || !date || !time || !email) {
    console.log(service, subservice, employee, date, time, email);
    return res.status(400).json({ msg: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Invalid email format.' });
  }

  let user;
  try {
    user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found. Please register first.' });
    }
  } catch (err) {
    console.error('Error finding or creating user:', err);
    return res.status(500).json({ msg: 'Error finding or creating user.' });
  }

  let serviceDoc;
  try {
    serviceDoc = await Service.findById(service);
    if (!serviceDoc) {
      return res.status(400).json({ msg: 'Service not found.' });
    }
  } catch (err) {
    console.error('Error finding service:', err);
    return res.status(500).json({ msg: 'Error finding service.' });
  }

  const subserviceDoc = serviceDoc.subservices.id(subservice);

  if (!subserviceDoc) {
    return res.status(400).json({ msg: 'Subservice does not belong to the selected service.' });
  }

  let existingBooking;
  try {
    existingBooking = await Booking.findOne({
      employee,
      date,
      time,
    });
    if (existingBooking) {
      return res.status(400).json({ msg: 'This time slot is already booked for the selected employee.' });
    }
  } catch (err) {
    console.error('Error checking existing bookings:', err);
    return res.status(500).json({ msg: 'Error checking existing bookings.' });
  }

  const booking = new Booking({
    user: user._id,
    service: serviceDoc._id,
    subservice: subserviceDoc.toObject(),
    employee,
    date,
    time,
  });

  try {
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error('Error creating booking:', err);
    return res.status(500).json({ msg: 'Error creating booking.' });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user service employee');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
