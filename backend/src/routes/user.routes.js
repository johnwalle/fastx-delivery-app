const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Middleware/authMiddleware');

const {
    registerUser,
    loginUser,
    // getUserProfile,
    getUserById,
    getAllUsers
} = require('../controllers/user.controller');

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/profile', authMiddleware, getUserProfile);
router.get('/:id', getUserById);
router.get('/', getAllUsers);

module.exports = router;