var mongoose = require('mongoose');

//report schema
var reportSchema = mongoose.Schema({
    doctorId:{
        type: String,
        required: true
    },
    patientId:{
        type: String,
        required: true
    },
    patientName:{
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
    description:{
        type: String,
        required: true
    },
    prescription:{
        type: String,
        required: true
    },
    nextDate:{
        type: String,
        required: true
    },
    create_date:{
        type: Date,
        default: Date.now
    }
});

// {
//     "doctorId": "5cce86e3c51e82a4a2cc429f",
//     "patientId": "5cd1472a57ad8b906d37b1d2",
//     "timestamp": "2019/05/26",
//     "description": "Description 2",
//     "nextDate": "2019/05/30"
// }

var Report = module.exports = mongoose.model('Report', reportSchema);

// Get Reports
module.exports.getReports = function(callback, limit){
    Report.find(callback).limit(limit);
}

