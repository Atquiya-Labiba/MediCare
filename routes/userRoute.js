const express = require('express');
const multer = require('multer')
const { signup, login, bookappointment, getdoctors, availabilitycheck, getappointments, profile, department, cabin, updateprofile, deleteappointments } = require('../controller/userController');
const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./medicare_frontend/public/uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})
const upload = multer({ storage: storage });


router.post('/signup', signup);
router.post('/', login)
router.post('/bookappointment', bookappointment);
router.post('/availabilitycheck', availabilitycheck);
router.get('/getdoctors', getdoctors)
router.get('/getappointments/:id', getappointments)
router.get('/profile/:id', profile)
router.get('/department', department)
router.get('/cabin', cabin)
router.delete('/deleteappointments/:id', deleteappointments)
router.put('/updateprofile/:id', upload.single("prescription"), updateprofile)



module.exports = router;
