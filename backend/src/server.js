const express = require('express');
require('colors');
require('dotenv').config();
const app = express();
// const cors = require('cors');
const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const menuRoutes = require('./routes/menu.routes')
const reviewRoutes = require('./routes/review.routes')
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');

// middleware
app.use(express.json());
// app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

//connecting to the database
connectDB();

// listening the server

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`.cyan.bold);
});