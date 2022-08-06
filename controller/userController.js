const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signup =async (req, res) => {
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
          const token=user.getJwtToken()
          const { name, email } = user;
          return res.status(201).json({
            token,
            user: { name, email },
          });
        }
      });
    });
  };


  
