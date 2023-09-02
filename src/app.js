const express = require('express');
const helmet = require('helmet');
const handleError = require('./utils/handleError');
const handleNotFound = require('./utils/handleNotFound');
const handleCors = require('./utils/handleCors');
const router = require('./api/routes');

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(handleCors);
// app.use(helmet());

app.use('/', router);

app.use(handleError);
app.use(handleNotFound);

module.exports = app;
