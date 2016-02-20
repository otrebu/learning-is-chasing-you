var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GoalSchema   = new Schema({
    title: String,
    timeToAchieve: Number,
    dueDate: Date,
    _user_id: Schema.Types.ObjectId
});

module.exports = mongoose.model('Goal', GoalSchema);
