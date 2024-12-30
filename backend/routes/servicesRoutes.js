const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const serviceController = require("../controllers/serviceController");
const subserviceController = require("../controllers/subserviceController");

const router = express.Router();

router.post("/", asyncHandler(serviceController.createService));
router.get("/", asyncHandler(serviceController.getAllServices));
router.get("/:service", asyncHandler(serviceController.detailService));
router.put("/:serviceId", asyncHandler(serviceController.updateService));
router.delete("/:serviceId", asyncHandler(serviceController.deleteService));

// Subservices
router.post(
  "/:serviceId/subservices",
  asyncHandler(subserviceController.addSubservice)
);
router.get(
  "/:serviceId/subservices",
  asyncHandler(subserviceController.getSubservicesByServiceId)
);
router.put(
  "/:serviceId/subservices/:subserviceId",
  asyncHandler(subserviceController.updateSubservice)
);
router.delete(
  "/:serviceId/subservices/:subserviceId",
  asyncHandler(subserviceController.deleteSubservice)
);

module.exports = router;
