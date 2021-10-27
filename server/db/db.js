const Sequelize = require('sequelize');
const DB_STRING = process.env.DATABASE_URL || 'postgres://super-rogatory@localhost:5432/coderone-jwt';
const config = {
	logging: false,
};
const db = new Sequelize(DB_STRING, config);

db.authenticate()
	.then(() => console.log('Connection has been established successfully.'))
	.catch((err) => console.log('Unable to connect to the database:', err));

module.exports = db;
