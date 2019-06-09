var mongoose = require('mongoose');


//Doctor Schema
var doctorSchema = mongoose.Schema({
    doctorName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    arrivalTime:{
        type: String,
        required: true
    },
    departureTime:{
        type: String,
        required: true
    },
    availability:{
        type: Boolean,
        required: true
    },
    patientCount:{
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