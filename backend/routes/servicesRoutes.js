const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const subserviceController = require('../controllers/subserviceController');

router.post('/', serviceController.createService);
router.get('/', serviceController.getAllServices);
router.get('/:serviceId', serviceController.detailService);
router.put('/:serviceId', serviceController.updateService);
router.delete('/:serviceId', serviceController.deleteService);



// CRUD Subservices
router.post('/:serviceId/subservices', subserviceController.addSubservice);
router.put('/:serviceId/subservices/:subserviceId', subserviceController.updateSubservice);
router.delete('/:serviceId/subservices/:subserviceId', subserviceController.deleteSubservice);
router.get('/:serviceId/subservices', subserviceController.getSubservicesByServiceId);

module.exports = router;
