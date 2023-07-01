const app = require('express')();
const { db } = require('./src/db');
const users = require('./src/routes/users');

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

app.listen(process.env.PORT, () => {
  db.connect()
    .then(() => {
      console.log('Database connected!');
      console.log('Server start on port:', process.env.PORT);
    })
    .catch((err) => console.error('Failed connect database:', err));
});
