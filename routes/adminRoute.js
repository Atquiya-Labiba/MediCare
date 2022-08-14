const express = require('express');
const { getallappointments } = require('../controller/adminController');
const { adminlogin } = require('../controller/adminController');
const { addcabin } = require('../controller/adminController');
const { adddept } = require('../controller/adminController');
const { adddoctor } = require('../controller/adminController');
const router = express.Router();

router.post('/adddoctor', adddoctor);
router.post('/adddept', adddept);
router.post('/adminlogin', adminlogin);
router.post('/addcabin', addcabin);
router.get('/department')
router.get('/appointmentinfo', getallappointments)

module.exports = router;
