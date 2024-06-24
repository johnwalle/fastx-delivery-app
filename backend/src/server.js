const express = require('express');
require('colors');
require('dotenv').config();
const app = express();
const connectDB = require('./config/connectDB');



//connecting to the database

connectDB();

// listening the server

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`.cyan.bold);
});