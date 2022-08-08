const mongoose = require('mongoose')
const deptSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
    },

    description:{
        type: String,
    }

});


module.exports = mongoose.model('dept', deptSchema)