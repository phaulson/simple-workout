var express = require('express');
var router = express.Router();
var user = require('./../models/user');

router.get('/', function (req, res) {
    if(req.cookies.username !== undefined)
        res.redirect('/');
    else
        res.render('login', { title: 'Login', msg: false, username: false, password: false });
});

router.post('/', function (req, res) {
    login(req, res);
});

function login(req, res) {
    var username = req.body.username_email.toLowerCase();
    var password = req.body.passwordLogin;

    user.count({ username: username, password: password }, function (err, count) {
        if (err)
            res.status(500).send(err).end();
        if (count > 0) {
            res.cookie('username', titleCase(username));
            res.redirect('/');
        }
        else {
            res.render('login', { title: 'Login', msg: 'Falscher username oder password', username: username, password: password });
        }
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