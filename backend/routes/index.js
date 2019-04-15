var express    = require('express'); 
var router     = express.Router();
var Workout    = require('./../models/workout');
var moment     = require('moment');

router.get('/', function(req, res) {
    if(req.cookies.username === undefined)
        res.redirect('/login');
    else {
        selectData(req, res, function(arr, ges) {
            res.render('index', { title: req.cookies.username, user: req.cookies.username,
                progress: arr, ges: ges }); 
        });
    }
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    Workout.find({ _id: id }).remove().exec();
    selectData(req, res, function(arr, ges) {
        res.status(200).send(JSON.stringify( {
            progress: arr,
            ges: ges
        })).end();
    });
});

function selectData(req, res, callback) {
    var arr = [];
    var ges = 0;
    Workout.find({ user: req.cookies.username.toLowerCase() }).sort([['date', -1], ['start', -1]]).exec(function(err, w) {
        if (err) 
            res.status(500).send(err).end();
        w.forEach(function(workout) {
            var w1 = {
                id: workout._id,
                date: _getDateFormat(workout.date),
                descr: workout.descr,
                start: workout.start.substring(0, 5),
                end: workout.end.substring(0, 5),
                duration: msToHMS(toDateTime(workout.end + ':00') - toDateTime(workout.start + ':00'))                   
            };
            arr.push(w1);
            ges += moment.duration(w1.duration, 'hh:mm').asMilliseconds();
        });
        var dur = moment.duration(ges);
        var days = (dur.days() < 10) ? '0' + dur.days() : dur.days();
        var hours = (dur.hours() < 10) ? '0' + dur.hours() : dur.hours();
        var mins = (dur.minutes() < 10) ? '0' + dur.minutes() : dur.minutes();
        dur = days + ':' + hours + ':' + mins;

        callback(arr, dur);
    });
}

function toDateTime(timestr) {
    var dat = new Date, time = timestr.split(/\:|\-/g);
    dat.setHours(time[0]);
    dat.setMinutes(time[1]);
    return dat;
};

function msToHMS(duration) {
    var milliseconds = parseInt((duration%1000)/100)
    , seconds = parseInt((duration/1000)%60)
    , minutes = parseInt((duration/(1000*60))%60)
    , hours = parseInt((duration/(1000*60*60))%24);

hours = (hours < 10) ? "0" + hours : hours;
minutes = (minutes < 10) ? "0" + minutes : minutes;
seconds = (seconds < 10) ? "0" + seconds : seconds;

return hours + ":" + minutes;
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