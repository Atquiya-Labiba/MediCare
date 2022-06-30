const express=require('express');
const env=require('dotenv');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');


//environment vconstants
env.config();

//mongodb connection
//mongodb+srv://AtquiyaLabiba:<password>@healthcare-db.kuo8t3h.mongodb.net/?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@healthcare-db.kuo8t3h.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}
).then(() =>{
    console.log('Database connected')
});

app.use(express.json());

//for get
app.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Hello the server is okay!'
    });
});

//for post
app.post('/data',(req,res,next)=>{
    res.status(200).json({
        message: req.body
    });
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});