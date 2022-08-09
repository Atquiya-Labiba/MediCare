const express = require('express');
const { signup, login, getdoctor } = require('../controller/userController');
const router = express.Router();

router.post('/signup', signup );
router.post('/login', login)
router.post('/bookapointment');
router.get('/department/:id', getdoctor);

module.exports = router;
