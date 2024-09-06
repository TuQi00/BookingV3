const express = require('express');
const router = express.Router();
const {checkExistenceMiddleware} = require("../helper/checkExist")
const employeeController = require('../controllers/employeeController');
const Employee = require('../models/Employee');

router.post('/', checkExistenceMiddleware(Employee,"name", "Employee already exist"),employeeController.createEmployee);
router.get('/:employeeID', employeeController.getEmployeeById);
router.get('/', employeeController.getAllEmployees);
router.put('/:employeeID', employeeController.updateEmployee);
router.delete('/:employeeID', employeeController.deleteEmployee);

module.exports = router;
