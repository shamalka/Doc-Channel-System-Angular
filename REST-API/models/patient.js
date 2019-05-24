var mongoose = require('mongoose');

//patient schema
var patientSchema = mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    gender:{
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
    doctor:{
        type: String,
        required: true
    },
    telephone:{
        type: String,
        required: true
    }
    // type:{
    //     type: String,
    //     required: true
    // }
});

var Patient = module.exports = mongoose.model('Patient', patientSchema);

// Get Patients
module.exports.getPatients = function(callback, limit){
    Patient.find(callback).limit(limit);
}

// Register Patient
// module.exports.registerPatient = function(patient, callback){
//     Patient.create(patient, callback);
// }
