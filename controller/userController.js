const moment = require("moment");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const booking = require("../models/bookingModel");
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


exports.login = (async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      message: 'enter email and password'
    })
  }
  const user = await User.findOne({ email }).select('+password')
  const token = user.getJwtToken()
  const { role } = user
  if (!user) {
    return res.status(401).json({
      message: 'Wrong email or password'
    })
  }
  const passCheck = await user.comparePassword(password)
  if (!passCheck) {
    return res.status(402).json({ message: 'Invalid password' })
  } else if (passCheck && user.role == 'user') {

    res.status(200).send({
      success: true,
      data: user,      
    });

  }

})

exports.bookappointment = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new booking(req.body);
    await newAppointment.save();

    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};


exports.availabilitycheck = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm").subtract(30, 'minutes').toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(30, 'minutes').toISOString();
    const docname = req.body.docname;
    const appointments = await booking.find({
      docname,
      date,
      time: { $gte: fromTime, $lte: toTime }
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments slot is not available for booking!",
        success: false,
      });
    }
    else {
      return res.status(200).send({
        message: "Appointments slot is available! ",
        success: true,
      });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};

exports.getdoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      message: "Doctor's info fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error to get doctor's info",
      success: false,
      error,
    });
  }
};


exports.getappointments = async (req, res) => {  
  try {    
    const appointments = await booking.find({userId:req.params.id});         
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




