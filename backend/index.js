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
mongoose.connect('mongodb://paulson:paulim15@ds163595.mlab.com:63595/paulsondatabase', {
    useMongoClient: true
});
var db = mongoose.connection;
db.on('open', function() {
    // insert first admin
    // var User = require('./models/user');
    // User.remove({}, function() {});
    // var admin = new User({username: 'paulson', email: 'pmuehlbacher13@gmail.com', password: 'paulim15', registeredAt: Date.now(), admin:  true });
    // admin.save();
    // console.log(admin);
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