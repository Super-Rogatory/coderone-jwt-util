require('dotenv').config();
const Sequelize = require('sequelize');
const DB_STRING = process.env.DATABASE_URL || `postgres://${process.env.DB_USER}@localhost:5432/${process.env.DB_NAME}`;
const config = {
	logging: false,
};
const db = new Sequelize(DB_STRING, config);

db.authenticate()
	.then(() => console.log('Connection has been established successfully.'))
	.catch((err) => console.log('Unable to connect to the database:', err));

module.exports = db;
