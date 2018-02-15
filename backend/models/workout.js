var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var WorkoutSchema   = new Schema({
    user: { type: String, required: true },
    date: { type: Date, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true },
    descr: { type: String, required: true }
});

module.exports = mongoose.model('Workout', WorkoutSchema);