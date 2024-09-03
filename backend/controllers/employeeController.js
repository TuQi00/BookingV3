// controllers/employeeController.js
const Employee = require('../models/Employee');

// Tạo nhân viên mới
exports.createEmployee = async (req, res) => {
  const { name, availability } = req.body;

  try {
    const newEmployee = new Employee({
      name,
      availability,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error creating employee.' });
  }
};

// Lấy danh sách tất cả nhân viên
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error retrieving employees.' });
  }
};

// Lấy chi tiết một nhân viên theo ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeID);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found.' });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error retrieving employee.' });
  }
};

// Cập nhật thông tin nhân viên theo ID
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found.' });
    }
    res.status(200).json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error updating employee.' });
  }
};

// Xóa nhân viên theo ID
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found.' });
    }
    res.status(200).json({ msg: 'Employee deleted.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error deleting employee.' });
  }
};

// Cập nhật tình trạng availability của nhân viên theo ID và ngày cụ thể
exports.updateAvailability = async (req, res) => {
  try {
    const { date, available } = req.body;
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found.' });
    }

    const availability = employee.availability.find(
      (entry) => entry.date.toISOString() === new Date(date).toISOString()
    );

    if (availability) {
      availability.available = available;
    } else {
      employee.availability.push({ date, available });
    }

    await employee.save();
    res.status(200).json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Error updating availability.' });
  }
};
