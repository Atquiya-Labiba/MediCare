const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const _jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: "User already registered",
      });

    const { name, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      name,
      email,
      hash_password,
    });

    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }

      if (user) {
        const token = user.getJwtToken()
        const { name, email } = user;
        return res.status(201).json({
          token,
          user: { name, email },
        });
      }
    });
  });
};


exports.login=(async(req,res,next)=>{
  const{email,password}=req.body
  if(!email || !password){
      return res.status(400).json({
          message:'enter email and password'
      })
  }
  const user= await User.findOne({email}).select('+password')
  const token =user.getJwtToken()
  const {role}=user
  if(!user){
      return res.status(401).json({
          message:'Wrong email or password'
      })
  }
  const passCheck=await user.comparePassword(password)
  if(!passCheck){
      return res.status(402).json({message:'Invalid password'})        
  }else if(passCheck && user.role=='user'){
      
      return res.status(200).json({user:{role},token,message:"Logged in succesfully",success:true})
    
  }
  
})

exports.getdoctor=(async(req, res) => {
  const id = req.params.id;
  const query = {_id: ObjectId(id)};
  const department = await departmentCollection.findOne(query);
  res.json(department);
});




