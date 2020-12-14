var mongoose = require("../config/mongoConfig");
var userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {strict: true});
var User = mongoose.model('User', userSchema);
module.exports = User;
