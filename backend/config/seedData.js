const mongoose = require("mongoose");
const Category = require("../models/Category");
const Service = require("../models/Service");
const Employee = require("../models/Employee");

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/nailbooking", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Clear existing data
    await Category.deleteMany();
    await Service.deleteMany();
    await Employee.deleteMany();
    console.log("Existing data cleared");

    // Seed categories
    const categories = [
      {
        name: "Hair Care",
        description: "Services related to hair styling and treatments.",
      },
      {
        name: "Skin Care",
        description: "Services for facial and body skin treatments.",
      },
      { name: "Massage Therapy", description: "Relaxing massage services." },
    ];

    const savedCategories = await Category.insertMany(categories);
    console.log("Categories seeded:", savedCategories);

    // Seed services
    const services = [
      {
        name: "Haircut",
        description: "Professional haircut services for men and women.",
        price: 20,
        duration: 30,
        category: savedCategories[0]._id,
      },
      {
        name: "Facial Treatment",
        description: "Deep cleansing facial for glowing skin.",
        price: 50,
        duration: 60,
        category: savedCategories[1]._id,
      },
      {
        name: "Full Body Massage",
        description: "Relaxing full-body massage to relieve stress.",
        price: 80,
        duration: 90,
        category: savedCategories[2]._id,
      },
    ];

    const savedServices = await Service.insertMany(services);
    console.log("Services seeded:", savedServices);

    // Seed employees
    const employees = [
      {
        name: "John Doe",
        role: "Hair Stylist",
        email: "john.doe@example.com",
        phone: "123-456-7890",
      },
      {
        name: "Jane Smith",
        role: "Skin Specialist",
        email: "jane.smith@example.com",
        phone: "987-654-3210",
      },
      {
        name: "Emily Johnson",
        role: "Massage Therapist",
        email: "emily.johnson@example.com",
        phone: "555-555-5555",
      },
    ];

    const savedEmployees = await Employee.insertMany(employees);
    console.log("Employees seeded:", savedEmployees);

    // Close the database connection
    await mongoose.disconnect();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
