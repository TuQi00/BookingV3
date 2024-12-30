const Employee = require("../models/Employee");
const asyncHandler = require("../middleware/asyncHandler");
const Subservice = require("../models/Subservice");

exports.createEmployee = asyncHandler(async (req, res) => {
  const { name, availability } = req.body;
  const employee = await Employee.create({ name, availability });
  res.status(201).json({ success: true, employee });
});

exports.getAllEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  res.json({ success: true, employees });
});

exports.getEmployeeById = async (req, res) => {
  const { employeeId } = req.params;

  try {
    // Tìm employee với employeeId
    const employee = await Employee.findById(employeeId);

    // Nếu không tìm thấy employee
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    // Trả về thông tin employee
    return res.status(200).json({ success: true, data: employee });
  } catch (error) {
    console.error("Error fetching employee details:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getEmployeesBySubserviceId = asyncHandler(async (req, res) => {
  const { subserviceId } = req.params;
  const subservice = await Subservice.findById(subserviceId);
  if (!subservice)
    return res.status(404).json({ message: "Subservice not found" });
  const employees = await Employee.find({ subservices: subserviceId });
  if (employees.length === 0)
    return res
      .status(404)
      .json({ message: "No employees found for this subservice" });
  res.status(200).json({ success: true, data: employees });
});

exports.updateEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const updateData = req.body;
  const employee = await Employee.findByIdAndUpdate(employeeId, updateData, {
    new: true,
  });
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json({ success: true, employee });
});

exports.deleteEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const employee = await Employee.findByIdAndDelete(employeeId);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json({ success: true, message: "Employee deleted successfully" });
});
