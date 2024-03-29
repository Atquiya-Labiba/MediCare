const path = require('path');
const express = require('express');
const app = express();
const router = express.Router();

require('dotenv').config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());

const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");

const port = process.env.PORT || 5000;


app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);


app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.listen(port, () => console.log(`Server started at ${port}`));

module.exports = router;