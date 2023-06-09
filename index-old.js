const express = require('express');
const { connect } = require('mongoose');
const morgan = require('morgan');
const router = require('./routes');
require('dotenv').config();

const { PORT, MONGO_URI } = process.env;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE, PATCH'
  );
  next();
});

app.use(morgan('dev'));
app.use(express.json());
app.use('/', router);

connect(MONGO_URI)
  .then(() => {
    console.info('Database connected!');
    app.listen(PORT, () => {
      console.info('Server listening on port:', PORT);
    });
  })
  .catch((error) => {
    console.error('Failed database connection. Error:\n', error);
  });
