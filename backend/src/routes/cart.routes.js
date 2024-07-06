const cartController = require('../controllers/cart.controller');
const auth = require('../Middleware/authMiddleware');
const express = require('express');
const router = express.Router();

router.get('/', auth.requireSignIn, cartController.getCart);
router.post('/add', auth.requireSignIn, cartController.addToCart);
router.post('/remove', auth.requireSignIn, cartController.removeFromCart);
router.post('/clear', auth.requireSignIn, cartController.clearCart);


module.exports = router;