var mongoose = require('mongoose');

//Doctor Schema
var doctorSchema = mongoose.Schema({
    doctorId:{
        type: String,
        required: true
    },
    doctorName:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }
});

var Doctor = module.exports = mongoose.model('Doctor', doctorSchema);

// Get Doctors
module.exports.getDoctors = function(callback, limit){
    Doctor.find(callback).limit(limit);
}