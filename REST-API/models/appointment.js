var mongoose = require('mongoose');

//Appointment Schema
var appointmentSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    doctor:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});



var Appointment = module.exports = mongoose.model('Appointment', appointmentSchema);

// Get Appointments
module.exports.getAppointments = function(callback, limit){
    Appointment.find(callback).limit(limit);
}

// Add Appointments
module.exports.addAppointment = function(appointment, callback){
    Appointment.create(appointment, callback);
}

//Remove appointment
module.exports.removeAppointment = function(appointmentId, callback){
    Appointment.findByIdAndRemove(appointmentId, callback);
}
