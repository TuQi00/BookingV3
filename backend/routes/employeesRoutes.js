const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const employeeController = require("../controllers/employeeController");
const { checkExistenceMiddleware } = require("../helper/checkExist");

const router = express.Router();

// Endpoint để lấy danh sách nhân viên theo subserviceId
router.get(
  "/subservices/:subserviceId", // Sửa endpoint lấy nhân viên theo subserviceId
  asyncHandler(employeeController.getEmployeesBySubserviceId) // Controller xử lý logic lấy nhân viên theo subserviceId
);

// Các endpoint khác vẫn giữ nguyên
router.post(
  "/",
  checkExistenceMiddleware("Employee", "name", "Employee already exists"),
  asyncHandler(employeeController.createEmployee)
);
router.get("/", asyncHandler(employeeController.getAllEmployees));
router.get("/:employeeId", asyncHandler(employeeController.getEmployeeById));
router.put("/:employeeId", asyncHandler(employeeController.updateEmployee));
router.delete("/:employeeId", asyncHandler(employeeController.deleteEmployee));

module.exports = router;
