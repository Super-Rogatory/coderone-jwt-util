const express = require('express');
const { issueJWT } = require('../auth/utils');
const User = require('../db/models/User');
const router = express.Router();

router.post('/', async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ where: { email } });
		if (!user) {
			res.json({ message: 'Email or password does not match!' });
			return;
		}
		if (user.password !== password) {
			res.json({ message: 'Email or password does not match!' });
			return;
		}

		const jwtToken = issueJWT(user);
		res.json({ message: 'Welcome Back!', token: jwtToken.token });
	} catch (err) {
		console.log('Error ', err);
		next(err);
	}
});
module.exports = router;
