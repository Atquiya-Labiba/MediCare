const Cabin = require("../models/cabinModel");
const Doctor= require("../models/doctorModel");
const Dept = require("../models/deptModel");
const booking = require("../models/bookingModel");
const User = require("../models/userModel");


exports.adddoctor = (req, res,next) => {
    const { name, degree, department } = req.body
    const doctor = new Doctor({
        name, degree, department
    })
    doctor.save((error, doctor) => {
        if (error) {
            return res.status(400).json({ error })
        }
        if (doctor) {
            return res.status(200).json({ doctor })
        }
    });
};


exports.adddept = (req, res,next) => {
    const { name, description,facility } = req.body
    const dept = new Dept({
        name, description, facility
    })
    dept.save((error, dept) => {
        if (error) {
            return res.status(400).json({ error })
        }
        if (dept) {
            return res.status(200).json({ dept })
        }
    });
};


exports.addcabin = (req, res) => {
    const { type,price,status } = req.body
    const cabin = new Cabin({
        type, price,status
    })
    cabin.save((error, cabin) => {
        if (error) {
            return res.status(400).json({ error })
        }
        if (cabin) {
            return res.status(200).json({ cabin })
        }
    });
};

exports.getallappointments = async (req, res) => {
    try {      
      const appointments = await booking.find({});
      res.status(200).send({
        message: "Appointment info fetched successfully",
        success: true,
        data: appointments,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error to get appointment's info",
        success: false,
        error,
      });
    }
  }; 

  exports.adminlogin = (async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({
        message: 'enter email and password'
      })
    }
    const user = await User.findOne({ email }).select('+password')
    const token = user.getJwtToken()    
    if (!user) {
      return res.status(401).json({
        message: 'Wrong email or password'
      })
    }
    const passCheck = await user.comparePassword(password)
    if (!passCheck) {
      return res.status(402).json({ message: 'Invalid password' })
    } else if (passCheck && user.role == 'admin') {
  
      res.status(200).send({
        success: true,
        data: user,
      });
  
    }
  
  })




