const mongoose = require("mongoose");
const connectDB = require("./db");
const Service = require("../models/Service");
const Employee = require("../models/Employee");
const User = require("../models/User");

const seedServices = async () => {
  const services = [
    {
      name: "Manicure",
      description: "Basic manicure services",
      price: 20,
      subservices: [
        { name: "Classic Manicure", price: 25 },
        { name: "French Manicure", price: 30 },
      ],
    },
    {
      name: "Pedicure",
      description: "Basic pedicure services",
      price: 30,
      subservices: [
        { name: "Classic Pedicure", price: 35 },
        { name: "French Pedicure", price: 40 },
      ],
    },
  ];

  await Service.deleteMany();
  await Service.insertMany(services);
  console.log("Services seeded");
};

const seedEmployees = async () => {
  const employees = [
    {
      name: "Alice",
      availability: [
        { date: new Date("2024-07-10T00:00:00Z"), available: true },
        { date: new Date("2024-07-11T00:00:00Z"), available: true },
      ],
    },
    {
      name: "Bob",
      availability: [
        { date: new Date("2024-07-10T00:00:00Z"), available: true },
        { date: new Date("2024-07-12T00:00:00Z"), available: true },
      ],
    },
  ];

  await Employee.deleteMany();
  await Employee.insertMany(employees);
  console.log("Employees seeded");
};

const seedUsers = async () => {
  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      password: "password123", // Make sure this gets hashed by User model's pre-save hook
    },
    {
      name: "Jane Doe",
      email: "jane@example.com",
      password: "password123", // Make sure this gets hashed by User model's pre-save hook
    },
  ];

  await User.deleteMany();
  await User.insertMany(users);
  console.log("Users seeded");
};

const seedDatabase = async () => {
  await connectDB();
  await seedServices();
  await seedEmployees();
  await seedUsers();
  mongoose.disconnect();
};

seedDatabase().catch((err) => console.error(err));
