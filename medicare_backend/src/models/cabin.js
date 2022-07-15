const mongoose= require('mongoose');

const cabinSchema = new mongoose.Schema({
    cabinID: {
        type: Number
    },

    floor: {
        type: String,
        required: true
    },

    roomNo: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true
    }
});



module.exports=mongoose.model('Cabin', cabinSchema);