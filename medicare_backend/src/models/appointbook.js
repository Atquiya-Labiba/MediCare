const mongoose= require('mongoose');

const appointmentSchema = new mongoose.Schema({
    appointmentNum: {
        type: Number        
    },

    PatientName: {
        type: String,
        required: true
    },

    day: {
        type: String,
        required: true
    },
    
    date: {
        type: String,
        required: true
    },

    time: {
        startTime: Date,
        endTime: Date,
        required: true
    },

    DocName: {
        type: String,
        required: true
    }
});




module.exports=mongoose.model('Appointment', appointmentSchema);