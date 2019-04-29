const LocalStrategy = require('passport-local').Strategy;
const Patient = require('../models/patient');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    // local strategy
    passport.use(new LocalStrategy(function(email, password, done){
        //match email
        let query = {email:email};
        Patient.findOne(query, function(err, patient){
            if(err) throw err;
            if(!patient){
                return done(null, false, {message: 'No user Found'});
            }

            //match password
            bcrypt.compare(password, patient.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, patient);
                }else{
                    return done(null, false, {message: 'Wrong password'});
                }
            });
        });
    }));

    passport.serializeUser(function(patient, done){
        done(null, patient.id);
    });

    passport.deserializeUser(function(id, done){
        Patient.findById(id, function(err, patient){
            done(err, patient);
        });
    });
}