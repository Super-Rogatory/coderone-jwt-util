const express = require('express');
const router = express.Router();
const User = require('../db/models/User');

router.post('/', async (req, res, next) => {
	console.log(req.body);
	const { fullName, email, password } = req.body;
	try {
		const user = await User.findOne({ where: { fullName } });
		if (user) {
			res.json({ message: 'User already exists' });
			return;
		}
		await User.create({ fullName, email, password });
	} catch (err) {
		console.log('Error ', err);
		res.json({ error: 'Cannot register user at the moment! ' });
		next(err);
	}
	res.send({ message: 'Thanks for registering' });
});
module.exports = router;
