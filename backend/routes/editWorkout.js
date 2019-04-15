var express = require('express');
var router = express.Router();
var Workout = require('./../models/workout');

router.get('/:id', function (req, res) {
    var id = req.params.id;
    Workout.findOne({ _id: id }, function (err, workout) {
        if (err)
            res.status(500).send(err).end();
        var w1 = {
            id: workout._id,
            date: _getDateFormat(workout.date),
            descr: workout.descr,
            start: workout.start.substring(0, 5),
            end: workout.end.substring(0, 5)
        };
        res.render('editWorkout', { title: 'Workout bearbeiten', workout: w1, user: req.cookies.username });
    });
});

router.post('/:id', function (req, res) {
    var id = req.params.id;
    var date = req.body.date;
    var start = req.body.start;
    var end = req.body.end;
    var descr = req.body.descr;

    Workout.findByIdAndUpdate({ _id: id }, { $set: { date: toIsoDate(date), start: start, end: end, descr: descr } }, function(err, w) {
        if (err)
            res.status(500).send(err).end();
        console.log('Workout for "' + req.cookies.username + '" updatetd');
        res.redirect('/');
    });
});

function toIsoDate(dateToParse) {
    var date = dateToParse.substring(dateToParse.length - 10, dateToParse.length);
    var dateArr = date.split('.');
    return dateArr[2] + '-' + dateArr[1] + '-' + dateArr[0];
}

function _getDateFormat(date) {
    var day = new Date(date).getDate() < 10 ? "0" + new Date(date).getDate() : new Date(date).getDate();
    var dateStr = _getDayOfWeek(date) + ', ' + day + ' ' + _getMonthName(date) + ' ' + new Date(date).getFullYear();
    if (dateStr.includes('null') || dateStr.includes('NaN'))
        return undefined;
    else
        return dateStr;
}
function _getDayOfWeek(date) {
    var dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];
}
function _getMonthName(date) {
    var dayOfWeek = new Date(date).getMonth();
    return isNaN(dayOfWeek) ? null : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][dayOfWeek];
}

module.exports = router;