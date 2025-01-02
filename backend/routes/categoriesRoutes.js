const express = require("express");
const router = express.Router();
const {
  addCategory, // Changed from addService
  getCategories, // Changed from getServicesByCategoryId
  updateCategory, // Changed from updateService
  deleteCategory, // Changed from deleteService
  getCategoryById, // Changed from getDetailServiceById
} = require("../controllers/categoryController");

router.get("/:categoryId", getCategoryById); // Changed route for category
router.post("/", addCategory); // Changed route for category
router.get("/", getCategories); // Changed route for category
router.put("/:categoryId", updateCategory); // Changed route for category
router.delete("/:categoryId", deleteCategory); // Changed route for category

module.exports = router;
