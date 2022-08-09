const express = require('express');
const { addcabin } = require('../controller/adminController');
const { adddept } = require('../controller/adminController');
const { adddoctor } = require('../controller/adminController');
const router = express.Router();

router.post('/adddoctor', adddoctor);
router.post('/adddept', adddept);
router.post('/addcabin', addcabin);
router.get('/department')

module.exports = router;
