const mongoose = require('mongoose')
const cabinSchema = new mongoose.Schema({


    type: {
        type: String,
        required: true,        
    },

    status: {
        type: String,
        required: true
    }, 

    price: {
        type: String,
        required: true
    }
    
    

});


module.exports = mongoose.model('cabin', cabinSchema)