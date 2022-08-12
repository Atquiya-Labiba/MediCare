const express = require('express');
const { signup, login, bookappointment, getdoctors, availabilitycheck, getappointments } = require('../controller/userController');
const router = express.Router();

router.post('/signup', signup );
router.post('/', login)
router.post('/bookappointment',bookappointment);
router.post('/availabilitycheck',availabilitycheck);
router.get('/getdoctors',getdoctors)
router.get('/getappointments/:id', getappointments)


module.exports = router;
