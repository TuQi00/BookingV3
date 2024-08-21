const express = require('express');
const router = express.Router();
const User = require('../middleware/checkAndCreateUser');

router.post('/', User.checkAndCreateUser);
router.get('/:email', User.getUserByEmail);

module.exports = router;
