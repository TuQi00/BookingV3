const mongoose = require("mongoose");
const Category = require("../models/Category"); // Changed to Category
const Service = require("../models/Service"); // Changed to Service

exports.addCategory = async (req, res) => {
  const { name, description } = req.body;
  const category = await Category.create({
    name,
    description,
  });
  res.status(201).json({ success: true, data: category });
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
  }
  res.status(200).json({ success: true, data: category });
};

exports.updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const updateData = req.body;
  const category = await Category.findByIdAndUpdate(categoryId, updateData, {
    new: true,
  });
  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
  }
  res.status(200).json({ success: true, data: category });
};

exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findByIdAndDelete(categoryId);
  if (!category) {
    return res
      .status(404)
      .json({ success: false, message: "Category not found" });
  }
  res
    .status(200)
    .json({ success: true, message: "Category deleted successfully" });
};
