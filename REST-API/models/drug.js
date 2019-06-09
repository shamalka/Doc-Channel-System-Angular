var mongoose = require('mongoose');


//drug Schema
var drugSchema = mongoose.Schema({
    drugName:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    }
});

var Drug = module.exports = mongoose.model('Drug', drugSchema);

