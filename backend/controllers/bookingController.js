const Booking = require("../models/Booking");
const Service = require("../models/Service");
const Subservice = require("../models/Subservice");
const User = require("../models/User");
const Employee = require("../models/Employee");
const { sendMail } = require("../helper/sendMail");

exports.createBooking = async (req, res) => {
  const { service, subservice, employee, date, time, email } = req.body;

  // Kiểm tra tất cả các trường yêu cầu
  if (!service || !subservice || !employee || !date || !time || !email) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  // Kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: "Invalid email format." });
  }

  let user;
  try {
    // Tìm user theo email
    user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User not found. Please register first." });
    }
  } catch (err) {
    console.error("Error finding user:", err);
    return res.status(500).json({ msg: "Error finding user." });
  }

  let serviceDoc;
  try {
    // Tìm service theo ID
    serviceDoc = await Service.findById(service);
    console.log(serviceDoc, "2");

    if (!serviceDoc) {
      return res.status(400).json({ msg: "Service not found." });
    }
  } catch (err) {
    console.error("Error finding service:", err);
    return res.status(500).json({ msg: "Error finding service." });
  }

  let subserviceDoc;
  try {
    // Tìm subservice theo ID
    subserviceDoc = await Subservice.findById(subservice);
    if (!subserviceDoc) {
      return res.status(400).json({ msg: "Subservice not found." });
    }

    // Kiểm tra subservice có thuộc về service đã chọn không
    if (!subserviceDoc.service.equals(service)) {
      return res
        .status(400)
        .json({ msg: "Subservice does not belong to the selected service." });
    }
  } catch (err) {
    console.error("Error finding subservice:", err);
    return res.status(500).json({ msg: "Error finding subservice." });
  }

  try {
    // Kiểm tra sự tồn tại của booking ở thời điểm và nhân viên đã chọn
    const existingBooking = await Booking.findOne({ employee, date, time });
    if (existingBooking) {
      return res.status(400).json({
        msg: "This time slot is already booked for the selected employee.",
      });
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

    const savedBooking = await booking.save();
    let users = await User.findById(user._id);
    if (!users) {
      return res.status(404).json({ msg: "User not found" });
    }
    users.bookings.push(savedBooking._id);
    await users.save();
    sendMail({
      receiverEmail: email,
      subject: "Create order success!",
    }).catch((e) => console.error("send mail error", e));

    res.status(201).json(savedBooking);
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ msg: "Error creating booking." });
  }
};

exports.updateBooking = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const booking = await Booking.findByIdAndUpdate(id, data, { new: true });
    if (!booking)
      return res.status(404).send("Đối tượng thực sự không tồn tại!");
    res.send(booking);
  } catch (error) {
    res.status(500).send({ message: "Update error", error });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user service employee");
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAvailableEmployees = async (req, res) => {
  const { date, time, serviceId } = req.query;
  let condition = {};

  try {
    //Lấy danh sách đã booking theo ngày, giờ
    if (date && time) {
      const bookings = await Booking.find({
        date: date,
        time: time,
        ...(serviceId && {
          subservice: serviceId,
        }),
      });
      const bookedEmployees = bookings.map((booking) => booking.employee);
      // set lại điều kiện lọc không bao gồm các _id đã có booking
      condition = {
        _id: { $nin: bookedEmployees },
      };
    }
    const availableEmployees = await Employee.find(condition);
    res.json(availableEmployees);
  } catch (error) {
    res.status(500).json({ message: "Get employees error!", error });
  }
};
