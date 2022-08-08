const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },

    degree: {
        type: String,
        required: true
    },    
    
    department: {
        type: String,
        required: true
    },

});


module.exports = mongoose.model('doctor', doctorSchema)