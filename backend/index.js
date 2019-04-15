// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

// connect to mongoose
// use own mlab account and mongodb connection string
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds<number><dsnumber>.mlab.com:<dsnumber>/<database>', {
    useMongoClient: true
});
var db = mongoose.connection;
db.on('open', function() {
    console.log('connected to mongodb');
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure app to use cookieParser()
app.use(cookieParser());

//public is directory for client css and js
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// ROUTES FOR OUR API
// =============================================================================
var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var logout = require('./routes/logout');
var addWorkout = require('./routes/addWorkout');
var editWorkout = require('./routes/editWorkout');

// REGISTER OUR ROUTES -------------------------------
app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);
app.use('/addWorkout', addWorkout);
app.use('/editWorkout', editWorkout);

var port = process.env.PORT || 8080;        // set our port
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('server lsitening on ' + port);