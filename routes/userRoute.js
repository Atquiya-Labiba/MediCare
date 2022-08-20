const path = require('path');
const express = require('express');
const multer = require('multer')
const { signup, login, bookappointment, getdoctors, availabilitycheck, getappointments, profile, department, cabin, updateprofile, deleteappointments, getrecords, updaterecord, recordtype } = require('../controller/userController');
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    }
    else {
        cb('Invalid file type')
    }
}
const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})


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
router.put('/updateprofile/:id', updateprofile)
router.get('/getrecords/:id', getrecords)
router.get('/recordtype/:id', recordtype)
router.post('/upload', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
    
})
router.post('/updaterecord/:id', updaterecord)



module.exports = router;
