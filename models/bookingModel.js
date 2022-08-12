const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
   
    
    userId:{
        type: String,
    },
    
    docname:{
        type: String,
        required: true,
    },      
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
        
    }
    

}, { timestamps: true });


module.exports = mongoose.model('booking', bookingSchema)