const express = require('express');
const router = express.Router();
// const { authMiddleware } = require('../Middleware/authMiddleware');
const { authLimiter } = require('../Middleware/auth.limiter');


const {
    login
} =
    require('../controllers/auth.controller');

router.post('/login', authLimiter, login);


module.exports = router;