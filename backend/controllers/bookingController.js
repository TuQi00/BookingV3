const Booking = require('../models/Booking');
const Service = require('../models/Service');
const Subservice = require('../models/Subservice')
const User = require('../models/User');


exports.createBooking = async (req, res) => {
  const { service, subservice, employee, date, time, email } = req.body;

  // Kiểm tra tất cả các trường yêu cầu
  if (!service || !subservice || !employee || !date || !time || !email) {
    return res.status(400).json({ msg: 'All fields are required.' });
  }

  // Kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Invalid email format.' });
  }

  let user;
  try {
    // Tìm user theo email
    user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found. Please register first.' });
    }
  } catch (err) {
    console.error('Error finding user:', err);
    return res.status(500).json({ msg: 'Error finding user.' });
  }

  let serviceDoc;
  try {
    // Tìm service theo ID
    serviceDoc = await Service.findById(service);
    console.log(serviceDoc,"2");
    
    if (!serviceDoc) {
      return res.status(400).json({ msg: 'Service not found.' });
    }
  } catch (err) {
    console.error('Error finding service:', err);
    return res.status(500).json({ msg: 'Error finding service.' });
  }

  let subserviceDoc;
  try {
    // Tìm subservice theo ID
    subserviceDoc = await Subservice.findById(subservice);
    if (!subserviceDoc) {
      return res.status(400).json({ msg: 'Subservice not found.' });
    }

    // Kiểm tra subservice có thuộc về service đã chọn không
    if (!subserviceDoc.service.equals(service)) {
      return res.status(400).json({ msg: 'Subservice does not belong to the selected service.' });
    }
  } catch (err) {
    console.error('Error finding subservice:', err);
    return res.status(500).json({ msg: 'Error finding subservice.' });
  }

  try {
    // Kiểm tra sự tồn tại của booking ở thời điểm và nhân viên đã chọn
    const existingBooking = await Booking.findOne({ employee, date, time });
    if (existingBooking) {
      return res.status(400).json({ msg: 'This time slot is already booked for the selected employee.' });
    }

    // Tạo booking mới
    const booking = new Booking({
      user: user._id,
      service: serviceDoc._id,
      subservice: subserviceDoc._id,
      employee,
      date,
      time,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error('Error creating booking:', err);
    res.status(500).json({ msg: 'Error creating booking.' });
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
