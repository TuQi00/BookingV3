const express = require("express");
const router = express.Router();
const {
  addSubservice,
  getSubservicesByServiceId,
  updateSubservice,
  deleteSubservice,
  getDetailSubserviceById,
} = require("../controllers/subserviceController");

// Định tuyến API
router.get("/:serviceId/subservices/:subserviceId", getDetailSubserviceById);

router.post("/:serviceId/subservices", addSubservice);
router.get("/:serviceId/subservices", getSubservicesByServiceId);
router.put("/:serviceId/subservices/:subserviceId", updateSubservice);
router.delete("/:serviceId/subservices/:subserviceId", deleteSubservice);

module.exports = router;
