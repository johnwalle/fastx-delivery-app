const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
} = require('../controllers/restaurant.controller');
const {
    requireSignIn,
    adminMiddleware,
    superAdminMiddleware,

} = require('../Middleware/authMiddleware');
const upload = multer();



router.post('/create', requireSignIn, superAdminMiddleware, upload.single('image'), createRestaurant);
router.get('/', getRestaurants);
router.get('/:id', getRestaurantById);
router.delete('/delete/:id', requireSignIn, superAdminMiddleware, deleteRestaurant);
router.put('/update/:id', requireSignIn, superAdminMiddleware, upload.single("image"), updateRestaurant);

module.exports = router;