const mongoose = require("mongoose");
const Service = require("../models/Service"); // Changed to Service
const Category = require("../models/Category"); // Changed to Category

exports.addService = async (req, res) => {
  const { categoryId } = req.params;
  const { name, description, price } = req.body;

  const category = await Category.findById(categoryId);
  if (!category) return res.status(404).json({ message: "Category not found" });

  const service = await Service.create({
    name,
    description,
    price,
    category: categoryId, // Changed to category
  });
  res.status(201).json({ success: true, data: service });
};

exports.getServiceById = async (req, res) => {
  const { categoryId, serviceId } = req.params;

  try {
    const service = await Service.findOne({
      category: categoryId, // Changed to category
      _id: serviceId,
    });

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    return res.status(200).json({ success: true, data: service });
  } catch (error) {
    console.error("Error fetching service details:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getServicesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID format" });
    }

    const services = await Service.find({
      category: new mongoose.Types.ObjectId(categoryId),
    });

    if (services.length === 0) {
      return res
        .status(404)
        .json({ message: "No services found for this category" });
    }

    return res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.updateService = async (req, res) => {
  const { serviceId } = req.params;
  const { name, description, price } = req.body;

  const service = await Service.findByIdAndUpdate(
    serviceId,
    { name, description, price },
    { new: true, runValidators: true }
  );
  if (!service) return res.status(404).json({ message: "Service not found" });
  res.status(200).json({ success: true, data: service });
};

exports.deleteService = async (req, res) => {
  const { serviceId } = req.params;
  const service = await Service.findByIdAndDelete(serviceId);
  if (!service) return res.status(404).json({ message: "Service not found" });
  res
    .status(200)
    .json({ success: true, message: "Service deleted successfully" });
};
