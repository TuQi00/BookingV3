const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const cors = require("cors");

const bookingRoutes = require("./routes/bookingsRoutes");
const employeeRoutes = require("./routes/employeesRoutes");
const categoryRoutes = require("./routes/categoriesRoutes"); // Updated to 'categoryRoutes'
const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/servicesRoutes"); // Updated to 'serviceRoutes'

// Kết nối cơ sở dữ liệu
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler);

// Định tuyến API
app.use("/api/bookings", bookingRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/categories", categoryRoutes); // Updated to 'categories'
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes); // Updated to 'services'

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
