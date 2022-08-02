const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
const connection = mongoose.connection;

connection.on('connected', () => {
    console.log('MongooDB is connected');
});

connection.on('error', (error) => {
    console.log('MongoDB connection error', error);
});

module.exports=mongoose;