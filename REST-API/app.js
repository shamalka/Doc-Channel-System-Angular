var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());
Appointment = require('./models/appointment');
Doctor = require('./models/doctor');

const cors = require('cors');

app.use(cors());
app.options('*', cors());

//Connection to Mongoose
mongoose.connect('mongodb://localhost/doctor_channel');
var db = mongoose.connection;

app.get('/', function(req, res){
    res.send('Go to api/doctors , api/patients , api/appointments');
});

app.get('/api/appointments', function(req, res){
    Appointment.getAppointments(function(err, appointments){
        if(err){
            throw err;
        }
        res.json(appointments);
    })
});

app.post('/api/appointments', function(req, res){
    var appointment = req.body;
    Appointment.addAppointment(appointment, function(err, appointment){
        if(err){
            throw err;
        }
        res.json(appointment);
    })
});

//Get Doctors
app.get('/api/doctors', function(req, res){
    Doctor.getDoctors(function(err, doctors){
        if(err){
            throw err;
        }
        res.json(doctors);
    })
});

app.listen(3000);
console.log('Server running at port 3000...');