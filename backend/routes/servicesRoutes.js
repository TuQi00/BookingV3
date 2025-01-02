const express = require("express");
const router = express.Router();
const {
  addService,
  getServiceById,
  getServicesByCategoryId,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

// Define routes
router.post("/:categoryId/services", addService);
router.get("/:categoryId/services", getServicesByCategoryId);
router.get("/:categoryId/services/:serviceId", getServiceById);
router.put("/:categoryId/services/:serviceId", updateService);
router.delete("/:categoryId/services/:serviceId", deleteService);

module.exports = router;
