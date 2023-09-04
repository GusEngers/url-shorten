const express = require('express');
const path = require('path');
const helmet = require('helmet');
const handleError = require('./utils/handleError');
const handleNotFound = require('./utils/handleNotFound');
const handleCors = require('./utils/handleCors');
const router = require('./api/routes');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(handleCors);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/', router);

app.use(handleError);
app.use(handleNotFound);

module.exports = app;
