const express = require('express');
const helmet = require('helmet');
const handleError = require('./utils/handleError');
const handleNotFound = require('./utils/handleNotFound');
const handleCors = require('./utils/handleCors');
const router = require('./api/routes');

const app = express();

app.use(express.json());
app.use(express.static('public'));
// app.use(helmet());
app.use(handleCors);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
// app.use('/api', router);

app.use(handleError);
app.use(handleNotFound);

module.exports = app;
