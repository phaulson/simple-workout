var express = require('express');
var router = express.Router();
var User = require('./../models/user');

router.get('/', function (req, res) {
    if(req.cookies.username !== undefined)
        res.redirect('/');
    else
        res.render('register', { title: 'Register', msg: false, username: false, password: false, email: false });
});

router.post('/', function (req, res) {
    register(req, res);
});

function register(req, res) {
    var username = req.body.username.toLowerCase();
    var password = req.body.passwordRegister;

    User.count({ username: username }, function (err, count) {
        if (err)
            res.status(500).send(err);
        if (count == 0) {
            res.cookie('username', titleCase(username));

            var u = new User({ username: username, password: password });
            u.save(function (err) {
                if (err)
                    res.status(500).send(err).end();
                console.log('User "' + req.cookies.username + '" created');
            });

            res.redirect('/');
        }
        else
            res.render('register', { title: 'Register', msg: 'Username already exists', username: username, password: password });
    });
}


function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}

module.exports = router;