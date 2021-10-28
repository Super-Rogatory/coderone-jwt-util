const express = require('express');
const { customAuthMiddleware } = require('../auth/utils');
const router = express.Router();

router.get('/', customAuthMiddleware, async (req, res) => {
	res.send({ message: 'User authorized, you have access sensitive information' });
});

module.exports = router;
