var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var expressValidator = require('express-validator');
var session = require('express-session');

const jwt = require('jsonwebtoken');
const config = require('./config/database');
const passport = require('passport');

app.use(bodyParser.json());
Appointment = require('./models/appointment');
Doctor = require('./models/doctor');

const cors = require('cors');

app.use(cors());
app.options('*', cors());

//Connection to Mongoose
mongoose.connect(config.database);
var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

// passport config
require('./config/passport')(passport);
//passport midlleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res){
    res.send('Go to api/doctors , api/patients , api/appointments');
});

//Route Files
let api = require('./routes/api');
app.use('/api', api);



app.listen(3000);
console.log('Server running at port 3000...');