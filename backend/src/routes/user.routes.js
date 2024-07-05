const express = require('express');
const router = express.Router();
const { requireSignIn, adminMiddleware } = require('../Middleware/authMiddleware');


const {
    registerUser,
    getUserProfile,
    getUserById,
    getAllUsers,
    deleteUser,
    updateUser
} = require('../controllers/user.controller');

router.post('/register', registerUser);
router.get('/profile', requireSignIn, getUserProfile);
router.get('/:id', requireSignIn, adminMiddleware, getUserById);
router.get('/', requireSignIn, adminMiddleware, getAllUsers);
router.delete('/delete-user/:id', requireSignIn, deleteUser);
router.put('/update-user/:id', requireSignIn, updateUser);


module.exports = router;


