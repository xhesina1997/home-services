var mongoose = require("../config/mongoConfig");
var jobPostingSchema = new mongoose.Schema({}, {strict: false});
var JobPosting = mongoose.model('JobPosting', jobPostingSchema);
module.exports = JobPosting;
