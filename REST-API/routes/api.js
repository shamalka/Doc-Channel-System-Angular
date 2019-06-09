const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');


//models
let Appointment = require('../models/appointment');
let Doctor = require('../models/doctor');
let Patient = require('../models/patient');
let Report = require('../models/report');
let User = require('../models/users');
let Test = require('../models/test');

//Get all appointments
router.get('/appointments/all', function(req, res){
    Appointment.getAppointments(function(err, appointments){
        if(err){
            throw err;
        }
        res.json(appointments);
    })
});

//get all reports
router.get('/reports/all', function(req, res){
    Report.getReports(function(err, reports){
        if(err){
            throw err;
        }
        res.json(reports);
    })
});

//Get user appointments
router.post('/appointments/user', function(req, res){
    const userId = req.body.userId;
    Appointment.find({userId: userId}, function(err, appointment){
        if(err){
            throw err;
        }
        res.json(appointment);
        
    })
});

//Add new appointment
router.post('/appointments/add', function(req, res){
    var appointment = req.body;
    Appointment.addAppointment(appointment, function(err, appointment){
        if(err){
            throw err;
        }
        res.json(appointment);
        
    })
});

//Remove Appointment
router.delete('/appointments/rem/:appointmentId', function(req, res){
    let appointmentId = req.params.appointmentId;

    Appointment.findOneAndRemove({_id: appointmentId}, function(err, appointment){
        if(err){
            throw err;
        }
        res.json(appointment);
        
    });
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

//get available doctors
router.get('/doctors/available', function(req, res){
    Doctor.find({availability: true}, function(err, doctors){
        if(err){
            throw err;
        }
        res.json(doctors);
        
    })
})

//Get Patients
router.get('/patients', function(req, res){
    Patient.getPatients(function(err, patients){
        if(err){
            throw err;
        }
        res.json(patients);
    })
});

//-----------------------------------------------------------------
//Login and Registration

//Register patient
router.post('/register/patient', function(req, res){
    //get data from header
    const fullName = req.body.fullName;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const email = req.body.email;
    const password = req.body.password;
    const telephone = req.body.telephone;
    //const type = req.body.type;

    //set data to Patient object
    let newPatient = new Patient();
        newPatient.fullName = fullName;
        newPatient.dob = dob;
        newPatient.gender = gender;
        newPatient.email = email;
        newPatient.password = password;
        newPatient.telephone = telephone;
        //newPatient.type = type;

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
                                    token: token,
                                    id: user.id,
                                    
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

//Login and register both patient and doctor in same route. Seperate them using a flag (userFlag)

//Register User
router.post('/users/register/:userFlag', function(req, res){
    let userFlag = req.params.userFlag;

    if(userFlag=='patient'){
        //get data from header
        const fullName = req.body.fullName;
        const dob = req.body.dob;
        const gender = req.body.gender;
        const email = req.body.email;
        const password = req.body.password;
        const doctor = req.body.doctor;
        const telephone = req.body.telephone;
        //const type = req.body.type;

        //set data to Patient object
        let newPatient = new Patient();
            newPatient.fullName = fullName;
            newPatient.dob = dob;
            newPatient.gender = gender;
            newPatient.email = email;
            newPatient.password = password;
            newPatient.doctor = doctor;
            newPatient.telephone = telephone;
            //newPatient.type = type;

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
    }else if(userFlag=='doctor'){
        //Register Doctor
        //get data from header
        const doctorName = req.body.doctorName;
        const email = req.body.email;
        const password = req.body.password;
        const arrivalTime = req.body.arrivalTime;
        const departureTime = req.body.departureTime;
        const availability = req.body.availability;
        const type = req.body.type;
        //const type = req.body.type;

        //set data to Doctor object
        let newDoctor = new Doctor();
            newDoctor.doctorName = doctorName;
            newDoctor.email = email;
            newDoctor.password = password;
            newDoctor.arrivalTime = arrivalTime;
            newDoctor.departureTime = departureTime;
            newDoctor.availability = availability;
            newDoctor.type = type;
            

        //encrypt password and send data to db
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(newDoctor.password, salt, function(err, hash){
                if(err){
                    console.log(err);
                }
                newDoctor.password = hash;
                newDoctor.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    } else{
                        res.json(newDoctor);
                    }
                });
            });
        });
    }

    
});

//Login User
router.post('/users/login/:userFlag', function(req, res){
    let userFlag = req.params.userFlag;

    if(userFlag=='patient'){
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
                                        token: token,
                                        id: user.id,
                                        userName: user.fullName
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
    }else if(userFlag=='doctor'){
        //doctor login
        const email = req.body.email;
        const password = req.body.password;

        var signUser = req.body;

        userObj = {
            email: email,
            password: password
        }

        Doctor.findOne({email: email}, (error, user) => {
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
                                        token: token,
                                        id: user.id,
                                        userName: user.doctorName
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
    }
});

//--------------------------------------------------------------
//Doctor Dashboard

//Get doctor details
router.get('/doctors/:doctorId', function(req, res){
    let doctorId = req.params.doctorId;
    Doctor.find({_id: doctorId}, function(err, doctor){
        if(err){
            throw err;
        }
        res.json(doctor);
        
    })
});

//Get patients for doctor
router.get('/doctors/patients/:doctorId', function(req, res){
    let doctorId = req.params.doctorId;
    Patient.find({doctor: doctorId}, function(err, patients){
        if(err){
            throw err;
        }
        res.json(patients);
        
    })
});

//Get appointments for doctor
router.get('/doctors/appointments/:doctorId', function(req, res){
    let doctorId = req.params.doctorId;
    Appointment.find({doctor: doctorId}, function(err, appointments){
        if(err){
            throw err;
        }
        res.json(appointments);
        
    })
});

//Update doctor
router.post('/doctors/update/:doctorId', function(req, res){
    let doctorId = req.params.doctorId;
    let doctorName = req.body.doctorName;
    let email = req.body.email;
    let arrivalTime = req.body.arrivalTime;
    let departureTime = req.body.departureTime;

    Doctor.findOneAndUpdate({_id: doctorId}, {$set: {doctorName : doctorName, email: email, arrivalTime: arrivalTime, departureTime: departureTime}}, function(err, doctor){
        if(err){
            console.log(err);
            return;
        } else{
            res.json(doctor);
        }
    })
});

//Add report
router.post('/reports/add', function(req, res){
    //get data from header
    const doctorId = req.body.doctorId;
    const patientId = req.body.patientId;
    const patientName = req.body.patientName;
    const dob = req.body.dob;
    const gender = req.body.gender;
    const description = req.body.description;
    const prescription = req.body.prescription;
    const nextDate = req.body.nextDate;

    //set data to Report object
    let newReport = new Report();
        newReport.doctorId = doctorId;
        newReport.patientId = patientId;
        newReport.patientName = patientName;
        newReport.dob = dob;
        newReport.gender = gender;
        newReport.description = description;
        newReport.prescription = prescription;
        newReport.nextDate = nextDate;

        //Add report object to collection
        newReport.save(function(err){
            if(err){
                console.log(err);
                return;
            } else{
                res.json(newReport);
            }
        });
});

//Get reports for patient and doctor
router.get('/reports/:patientId/:doctorId', function(req, res){
    let patientId = req.params.patientId;
    let doctorId = req.params.doctorId;
    Report.find({doctorId: doctorId , patientId: patientId}, function(err, reports){
        if(err){
            throw err;
        }
        res.json(reports);
        
    })
});

//Set Availability
router.post('/doctors/availability/:doctorId/:status', function(req, res){
    let doctorId = req.params.doctorId;
    let status = req.params.status;

    Doctor.findOneAndUpdate({_id : doctorId}, {$set: {availability : status}}, function(err, doctor){
        if(err){
            console.log(err);
            return;
        } else{
            res.json(doctor);
        }
    })
});

//
//Set appointment Status
router.post('/appointments/status/:appointmentId/:status', function(req, res){
    let doctorId = req.params.doctorId;
    let status = req.params.status;
    let appointmentId = req.params.appointmentId;

    Appointment.findOneAndUpdate({_id: appointmentId}, {$set: {status : status}}, function(err, appointment){
        if(err){
            console.log(err);
            return;
        } else{
            res.json(appointment);
        }
    })
});

//assign doctor to patient
router.post('/patients/adddoctor/:patientId/:doctorId', function(req, res){
    let patientId = req.params.patientId;
    let doctorId = req.params.doctorId;

    Patient.findOneAndUpdate({_id: patientId}, {$set: {doctor : doctorId}}, function(err, patient){
        if(err){
            console.log(err);
            return;
        } else{
            res.json(patient);
        }
    })
});

//remove doctor from patient
router.post('/patients/remdoctor/:patientId', function(req, res){
    let patientId = req.params.patientId;

    Patient.findOneAndUpdate({_id: patientId}, {$set: {doctor : ''}}, function(err, patient){
        if(err){
            console.log(err);
            return;
        } else{
            res.json(patient);
        }
    })
});


//----------------------------------------------------------------
//Patient Dashboard

//get patient
//Get doctor details
router.get('/patients/:patientId', function(req, res){
    let patientId = req.params.patientId;
    Patient.find({_id: patientId}, function(err, patient){
        if(err){
            throw err;
        }
        res.json(patient);
        
    })
});

//Update patient
router.post('/patients/update/:patientId', function(req, res){
    let patientId = req.params.patientId;
    let fullName = req.body.fullName;
    let email = req.body.email;
    let dob = req.body.dob;
    let gender = req.body.gender;
    let telephone = req.body.telephone;

    Patient.findOneAndUpdate({_id: patientId}, {$set: {fullName : fullName, email: email, dob: dob, gender: gender, telephone: telephone}}, function(err, patient){
        if(err){
            console.log(err);
            return;
        } else{
            res.json(patient);
        }
    })
});

//Get patient's appointments
router.get('/patients/appointments/:patientId', function(req, res){
    let patientId = req.params.patientId;
    Appointment.find({userId: patientId}, function(err, appointments){
        if(err){
            throw err;
        }
        res.json(appointments);
        
    })
});

//get reports for patients only


//Get patient's reports
router.get('/reports/:patientId', function(req, res){
    let patientId = req.params.patientId;
    Report.find({patientId: patientId}, function(err, reports){
        if(err){
            throw err;
        }
        res.json(reports);
        
    })
});

//----------------------------------------------------------------
//Test
//find post
router.get('/posts', function(req, res){
    const title = req.params.title;
    
    Test.getPosts(function(err, posts){
        if(err){
            throw err;
        }
        res.json(posts);
    })
});

//Add Post
router.post('/addpost/add', function(req, res){
    var post = req.body;
    Test.addPost(post, function(err, post){
        if(err){
            throw err;
        }
        res.json(post);
        
    })
});

//Add Comment
router.post('/addcomment/:postId', function(req, res){
    var comment = req.body;
    var postId = req.params.postId;

    // Test.Post.findOneAndUpdate({_id : postId}, {$set: {title : 'tt'}}, function(err, post){
    //     if(err){
    //         console.log(err);
    //         return;
    //     } else{
    //         res.json(post);
    //     }
    // })

    Test.addComment(postId, comment, function(err, post){
        if(err){
            throw err;
        }
        res.json(post);
    })
});

//get posts by comment id
router.get('/posts/comments/:commentId', function(req, res){
    let commentId = req.params.commentId;
    Test.find({'comments._id': commentId}, function(err, posts){
        if(err){
            throw err;
        }
        res.json(posts);
        
    })
});

module.exports = router;