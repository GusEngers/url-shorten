const express = require('express');
const { connect } = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const { PORT, MONGO_URI } = process.env;
const app = express();

app.use(morgan('dev'));
app.use(express.json());

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
