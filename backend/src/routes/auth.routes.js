const express = require('express');
const router = express.Router();
// const { authMiddleware } = require('../Middleware/authMiddleware');
const { authLimiter } = require('../Middleware/auth.limiter');


const {
    login,
    refreshToken,
    forgotPassword,
    resetPassword,
} =
    require('../controllers/auth.controller');

router.post('/login', authLimiter, login);
router.post(
    "/refresh-token", refreshToken);
    
router.post(
    "/forgot-password",
    forgotPassword
);

router.post(
    "/reset-password/:token",
    resetPassword
);

module.exports = router;