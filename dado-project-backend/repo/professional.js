var mongoose = require("../config/mongoConfig");
var professionalSchema = new mongoose.Schema({}, {strict: false});
var Professional = mongoose.model('Professional', professionalSchema);
module.exports = Professional;
