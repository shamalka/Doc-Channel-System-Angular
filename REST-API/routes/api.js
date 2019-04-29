const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');


//models
Appointment = require('../models/appointment');
Doctor = require('../models/doctor');
let Patient = require('../models/patient');

router.get('/appointments', function(req, res){
    Appointment.getAppointments(function(err, appointments){
        if(err){
            throw err;
        }
        res.json(appointments);
    })
});

router.post('/appointments', function(req, res){
    var appointment = req.body;
    Appointment.addAppointment(appointment, function(err, appointment){
        if(err){
            throw err;
        }
        res.json(appointment);
        
    })
});

//Get Doctors
router.get('/doctors', function(req, res){
    Doctor.getDoctors(function(err, doctors){
        if(err){
            throw err;
        }
        res.json(doctors);
    })
});

//Get Patients
router.get('/patients', function(req, res){
    Patient.getPatients(function(err, patients){
        if(err){
            throw err;
        }
        res.json(patients);
    })
});

//Register patient
router.post('/register/patient', function(req, res){
    //get data from header
    const patientName = req.body.patientName;
    const age = req.body.age;
    const gender = req.body.gender;
    const email = req.body.email;
    const password = req.body.password;
    const telephone = req.body.telephone;
    const type = req.body.type;

    //set data to Patient object
    let newPatient = new Patient();
        newPatient.patientName = patientName;
        newPatient.age = age;
        newPatient.gender = gender;
        newPatient.email = email;
        newPatient.password = password;
        newPatient.telephone = telephone;
        newPatient.type = type;

    //encrypt password and send data to db
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newPatient.password, salt, function(err, hash){
            if(err){
                console.log(err);
            }
            newPatient.password = hash;
            newPatient.save(function(err){
                if(err){
                    console.log(err);
                    return;
                } else{
                    res.json(newPatient);
                }
            });
        });
    });
});


//Login test
router.post('/login', (req, res) => {
    
    var user = req.body;

    jwt.sign({user}, 'secretKey', (err, token) => {
        res.json({
            token: token
        });
    });
});

//login patient
router.post('/patient/login', function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    var signUser = req.body;

    userObj = {
        email: email,
        password: password
    }

    Patient.findOne({email: email}, (error, user) => {
        if(error){
            console.log('Error - login api:', error)
        }
        else{
            if(!user){
                res.status(401).send('Invalid email!')
            }
            else{
                // if(user.password != password){
                //     res.status(401).send('Invalid password')
                // }
                // else{
                    //res.json(userObj);
                    //compare password
                    bcrypt.compare(password, user.password, function(err, isMatch){
                        if(err) throw err;
                        if(isMatch){
                            signUser.email = user.email;
                            signUser.password = user.password;
                            
                            //get token
                            jwt.sign({signUser}, 'secretKey', (err, token) => {
                                res.json({
                                    token: token
                                });
                            });
                        }else{
                            res.status(401).send('Invalid password')
                        }
                    });
                //}
            }
        }
    });
});


module.exports = router;