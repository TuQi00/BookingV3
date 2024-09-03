const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const { detailSubservice } = require('../controllers/subserviceController');
const router = express.Router();

router.get('/:subserviceId', detailSubservice);


module.exports = router;
