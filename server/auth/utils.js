const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const PRIV_KEY = fs.readFileSync(path.resolve(__dirname, 'id_rsa_priv.pem'), 'utf-8');
const PUB_KEY = fs.readFileSync(path.resolve(__dirname, 'id_rsa_pub.pem'), 'utf-8');

const issueJWT = (user) => {
	const expiresIn = '1d';
	const signedToken = jwt.sign({ id: user.id, email: user.email }, PRIV_KEY, { expiresIn, algorithm: 'RS256' });
	return {
		token: 'Bearer ' + signedToken,
		expires: expiresIn,
	};
};

const customAuthMiddleware = (req, res, next) => {
	// const tokenParts = req.headers.authorization.split(' ');
	const [bearer, jsonToken] = req.headers.authorization.split(' ');
	if (bearer === 'Bearer' && jsonToken.match(/\S+\.\S+\.\S+/) !== null) {
		try {
			const verification = jwt.verify(jsonToken, PUB_KEY, { algorithms: ['RS256'] });
			req.jwt = verification;
			next();
		} catch (err) {
			res.status(401).json({ msg: 'you are not authorized to visit this route' });
		}
	}
};

module.exports = {
	issueJWT,
	customAuthMiddleware,
};
