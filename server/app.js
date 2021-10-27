const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;
const db = require('./db/db'); // will run authenticate method.

// bootstrap db
db.sync()
	.then(() => console.log('database is ready to go!'))
	.catch((err) => console.log('failed to start up the database \n', err));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// statically serving the public folder
app.use(express.static(path.resolve(__dirname, '../client/public')));

// cross origin resource sharing
app.use(cors());

// logging middleware
app.use(morgan('dev'));

// mounting
app.use('/api', require('./api/index'));

// handling file not found
app.use((req, res, next) => {
	res.status(404);
	const error = new Error('file not found');
	next(error);
});

// true error handler
app.use((err, req, res, next) => {
	res.status(500);
	res.send({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' && err.stack,
	});
});

app.listen(PORT, () => console.log(`actively listening on PORT ${PORT}`));
