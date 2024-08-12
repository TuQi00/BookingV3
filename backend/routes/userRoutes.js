const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/check', userController.checkUser);
router.post('/', userController.createUser);
router.get('/:email', userController.getUserByEmail);

module.exports = router;
