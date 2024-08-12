const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db")
const cors = require('cors'); 

const bookingRoutes = require("./routes/bookingsRoutes");
const employeeRoutes = require("./routes/employeesRoutes");
const serviceRoutes = require("./routes/servicesRoutes");
const userRoutes = require("./routes/userRoutes");
const subserviceRoutes = require("./routes/subserviceRoutes");

const app = express();
connectDB()
app.use(cors());

app.use(bodyParser.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subservices", subserviceRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
