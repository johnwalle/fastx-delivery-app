const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const auth = require('../Middleware/authMiddleware');



router.post('/create', auth.requireSignIn, orderController.createOrder);
router.get('/all', auth.requireSignIn, auth.adminMiddleware, orderController.getAllOrders);
router.get('/user', auth.requireSignIn, orderController.getAllUserOrders);
router.get('/get/:orderId', auth.requireSignIn, orderController.getOrderById);
router.put('/update/:orderId', auth.requireSignIn, auth.adminMiddleware, orderController.updateOrderStatus);



module.exports = router;