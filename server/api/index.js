const express = require('express');
const router = express.Router();

router.use('/register', require('./register'));
router.use('/login', require('./login'));
router.use('/protected', require('./protected'));

module.exports = router;
