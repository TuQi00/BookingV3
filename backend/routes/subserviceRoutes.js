const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const { addSubservice, updateSubservice, deleteSubservice, getSubservicesByServiceId } = require('../controllers/subserviceController');
const router = express.Router();

router.post('/:serviceId/', asyncHandler(addSubservice));
router.put('/:serviceId/:subserviceId', asyncHandler(updateSubservice));
router.delete('/:serviceId/:subserviceId', asyncHandler(deleteSubservice));

// New route to get all subservices of a selected service
router.get('/:serviceId', asyncHandler(getSubservicesByServiceId));

module.exports = router;
