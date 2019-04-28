var mongoose = require('mongoose');

//patient schema
var patientSchema = mongoose.Schema({
    patientID:{
        type: String,
        required: true
    },
    patientName:{
        type: String,
        required: true
    },
    age:{
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
    telephone:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }
});
var Patient = module.exports = mongoose.model('Patient', patientSchema);
