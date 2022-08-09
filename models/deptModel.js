const mongoose = require('mongoose')
const deptSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
    },

    description:{
        type: String,
        required: true
    },

    facility:{
        type: String,
        required:true
    }


});


module.exports = mongoose.model('dept', deptSchema)