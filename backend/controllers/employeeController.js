const Employee = require('../models/Employee');

exports.createEmployee = async (req, res) => {
  const { name, availability } = req.body;

  const employee = new Employee({ name, availability });
  await employee.save();
  res.status(201).json(employee);
};

exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};
