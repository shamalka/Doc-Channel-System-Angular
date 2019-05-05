var mongoose = require('mongoose');

//user schema
var userSchema = mongoose.Schema({ any: mongoose.Mixed });

var User = module.exports = mongoose.model('User', userSchema);

// Get users
module.exports.getUsers = function(callback, limit){
    User.find(callback).limit(limit);
}

// Register Patient
// module.exports.registerPatient = function(patient, callback){
//     Patient.create(patient, callback);
// }
