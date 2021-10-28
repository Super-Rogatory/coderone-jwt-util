const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
	modulusLength: 4096,
	publicKeyEncoding: {
		type: 'pkcs1',
		format: 'pem',
	},
	privateKeyEncoding: {
		type: 'pkcs1',
		format: 'pem',
	},
});

fs.writeFileSync(path.resolve(__dirname, 'id_rsa_pub.pem'), publicKey);
fs.writeFileSync(path.resolve(__dirname, 'id_rsa_priv.pem'), privateKey);
