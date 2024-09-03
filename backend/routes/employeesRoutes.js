const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/', employeeController.createEmployee);
router.get('/:employeeID', employeeController.getEmployeeById);
router.get('/', employeeController.getAllEmployees);
router.put('/:employeeID', employeeController.updateEmployee);
router.delete('/:employeeID', employeeController.deleteEmployee);

module.exports = router;
