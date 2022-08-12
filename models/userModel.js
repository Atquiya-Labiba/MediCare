const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const _jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    hash_password: {
        type: String,
        required: true,
    },

    contact_no: {
        type: String,
    },

    age: {
        type: Number,
    },

    gender: {
        type: String,
    },

    prescription: {
        type: Array,
        default: [],
    },

    role:{
        type: String,
        enum:['user','admin'],
        default:'user',
    },

    profilepic: {
        type:
            String,
    },

}, { timestamps: true });

userSchema.virtual('password').set(function (password) {
    this.hash_password = bcrypt.hashSync(password, 10)
})
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.hash_password)
}
userSchema.methods.getJwtToken = function () {
    return _jwt.sign({ _id: this._id }, process.env.JWT_TOKEN,
        { expiresIn: '1h' })
}


module.exports = async (req, res, next) => {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      jwt.verify(token, getJwtToken, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Auth failed",
            success: false,
          });
        } else {
          req.body.userId = decoded.id;
          next();
        }
      });
    } catch (error) {
      return res.status(401).send({
        message: "Auth failed",
        success: false,
      });
    }
  };
module.exports = mongoose.model('User', userSchema)