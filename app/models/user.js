var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
    nickname: String,
    email: { type: String, lowercase: true }
});

module.exports = mongoose.model('User', UserSchema);
