const moment = require("moment");
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const booking = require("../models/bookingModel");
const dept = require("../models/deptModel");
const cabin = require("../models/cabinModel");
const bcrypt = require("bcryptjs");



exports.signup = async (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: "User already registered",
      });

    const { name, email, password, age, gender, contact_no } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      name,
      email,
      hash_password,
      age,
      gender,
      contact_no
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


exports.login = (async (req, res) => {
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
    res.status(500).send({
      message: "Error to get doctor's info",
      success: false,
      error,
    });
  }
};


exports.getappointments = async (req, res) => {
  try {
    const appointments = await booking.find({ userId: req.params.id });
    res.status(200).send({
      message: "Appointment info fetched successfully",
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error to get appointment's info",
      success: false,
      error,
    });
  }
};

exports.profile = async (req, res) => {
  try {

    const profile = await User.find({ userId: req.params.id });
    res.status(200).send({
      message: "Profile info fetched successfully",
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error to get profile's info",
      success: false,
      error,
    });
  }
};


exports.department = async (req, res) => {
  try {
    const departments = await dept.find({});
    res.status(200).send({
      message: "Department info fetched successfully",
      success: true,
      data: departments,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error to get department info",
      success: false,
      error,
    });
  }
};


exports.cabin = async (req, res) => {
  try {
    const cabins = await cabin.find({});
    res.status(200).send({
      message: "Cabin info fetched successfully",
      success: true,
      data: cabins,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error to get cabin info",
      success: false,
      error,
    });
  }
};


exports.updateprofile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      if (req.body.email) {
        user.email = req.body.email
      }
      if (req.body.name) {
        user.name = req.body.name
      }
      if (req.body.age) {
        user.age = req.body.age
        console.log(`${user.age}`)
      }
      if (req.body.gender) {
        user.gender = req.body.gender
      }
      if (req.body.contact_no) {
        user.contact_no = req.body.contact_no
      }

    }

    const updateduser = await user.save();
    console.log(`${user}`)
    res.status(200).send({
      message: "User info fetched successfully",
      success: true,
      data: updateduser,
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error to get user info",
      success: false,
      error,
    });
  }
};



exports.deleteappointments = async (req, res) => {
  try {
    const appt = await booking.findById(req.params.id);
    await appt.remove()
    res.status(200).send({
      message: "Appointment deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error to delete appointment",
      success: false,
      error,
    });
  }
};

exports.viewrecords = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.medical_records.map(async (record) => {
      if (record._id.toString() === req.params.recId) {
        res.status(200).send({
          message: "Record info fetched successfully",
          success: true,
          data: record,
        });

      }
    })
  } catch (error) {
    res.status(500).send({
      message: "Error to getrecord's info",
      success: false,
      error,
    });
  }
};

exports.updaterecord = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (user) {
      const rec = {
        name: req.body.name,
        type: req.body.type,
        medical_image: req.body.medical_image
      }
      user.medical_records.push(rec)

      const updateduser = await user.save();
      res.status(200).send({
        message: "User info fetched successfully",
        success: true,
        data: updateduser,
      });
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error to get user info",
      success: false,
      error,
    });
  }
};


















