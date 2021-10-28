const express = require('express');
const router = express.Router();
const User = require('../db/models/User');

router.post('/', async (req, res) => {
	console.log(req.body);
	const { fullName, email, password } = req.body;
	try {
		const isUserExists = await User.findOne({ where: { fullName } });
		if (isUserExists) {
			res.json({ message: 'user already exists' });
			return;
		}
		await User.create({ fullName, email, password });
	} catch (err) {
		console.log('Error ', err);
		res.json({ error: 'Cannot register user at the moment! ' });
		return;
	}
	res.send({ message: 'Thanks for registering' });
});
module.exports = router;
