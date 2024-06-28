const express = require('express');
require('colors');
require('dotenv').config();
const app = express();
const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');


// middleware
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


//connecting to the database
connectDB();

// listening the server

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`.cyan.bold);
});