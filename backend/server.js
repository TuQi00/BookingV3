const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const cors = require("cors");
const session = require("express-session");

const bookingRoutes = require("./routes/bookingsRoutes");
const employeeRoutes = require("./routes/employeesRoutes");
const serviceRoutes = require("./routes/servicesRoutes");
const userRoutes = require("./routes/userRoutes");
const subserviceRoutes = require("./routes/subserviceRoutes");

// Kết nối cơ sở dữ liệu
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

// Cấu hình session
// app.use(
//   session({
//     secret: process.env.SECRET_KEY || "default_secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: false, // Đặt là true nếu bạn dùng HTTPS
//       maxAge: 60 * 60 * 1000, // Thời gian hết hạn (1 giờ)
//     },
//   })
// );
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Định tuyến API
app.use("/api/bookings", bookingRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subservices", subserviceRoutes);
// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
