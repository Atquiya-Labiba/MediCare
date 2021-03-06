const express=require('express');
const env=require('dotenv');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');


//routes
const userRoutes= require ('./routes/user');


//environment constants
env.config();


//mongodb connection
//mongodb+srv://AtquiyaLabiba:<password>@healthcare-db.kuo8t3h.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@healthcare-db.kuo8t3h.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
}
).then(() => {
    console.log('Database connected');
});

   

app.use(express.json());

app.use('/api', userRoutes);



app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});