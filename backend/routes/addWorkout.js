var express    = require('express'); 
var router     = express.Router();
var Workout    = require('./../models/workout');

router.get('/', function(req, res) {
    res.render('addWorkout', { title: 'Add Workout', user: req.cookies.username });
});

router.post('/', function(req, res) {
    var date = req.body.date;
    var start = req.body.start;
    var end = req.body.end;
    var descr = req.body.descr;

    var workout = new Workout({ user: req.cookies.username.toLowerCase(), date: toIsoDate(date),
        start: start, end: end, descr: descr });
    workout.save(function(err, w) {
        if (err) 
            res.status(500).send(err).end();
        console.log('Workout for "' + req.cookies.username + '" created');
        res.redirect('/');
    });
});

function toIsoDate(dateToParse) {
    var date = dateToParse.substring(dateToParse.length - 10, dateToParse.length);
    var dateArr = date.split('.');
    return dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
}

module.exports = router;