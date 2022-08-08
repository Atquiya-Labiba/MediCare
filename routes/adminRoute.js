const express = require('express');
const router = express.Router();

router.post('/adddoctor');
router.post('/adddept');
router.post('/addcabin');

module.exports = router;
