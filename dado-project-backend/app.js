var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var professionalController = require('./routes/professionalController');
var userController = require('./routes/userController');
var jobPostingController = require('./routes/jobPostingController');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// ------------------ Cors Configuration ------------------

var cors = require('cors');

app.use(cors());

var corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

app.use('*', cors(corsOptions));

// --------------------------------------------------------

// ------------------------- Routes -----------------------

app.use('/professionals', professionalController);
app.use('/job/postings', jobPostingController);
app.use('/user', userController);

// --------------------------------------------------------

module.exports = app;
