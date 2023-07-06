const app = require('express')();
const users = require('./routes/users');

require('dotenv').config();
app.use(require('express').json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
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

app.use(require('morgan')('dev'));
app.use('/users', users);

module.exports = app;
