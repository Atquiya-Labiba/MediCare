const express = require('express');
const { signup, login, bookappointment, getdoctors, availabilitycheck, getappointments, profile, department, cabin } = require('../controller/userController');
const router = express.Router();

router.post('/signup', signup );
router.post('/', login)
router.post('/bookappointment',bookappointment);
router.post('/availabilitycheck',availabilitycheck);
router.get('/getdoctors',getdoctors)
router.get('/getappointments/:id', getappointments)
router.get('/profile/:id',profile)
router.get('/department',department)
router.get('/cabin',cabin)


module.exports = router;
