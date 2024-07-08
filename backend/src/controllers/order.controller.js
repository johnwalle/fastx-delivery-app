const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError');
const orderService = require('../services/order.service');
// const deliveryService = require('../services/delivery.service');
const cartService = require('../services/cart.service');
// create order

const createOrder = catchAsync(async (req, res) => {
    const { cartId, delivery_instructions } = req.body;
    const user = req.user._id;

    // check if the cart field is provided
    if (!cartId) {
        throw new ApiError(400, 'Cart field is required');
    }

    // get user from req.user


    const cart = await cartService.getCartById(cartId);
    if (!cart) {
        throw new ApiError(404, 'Cart not found');
    }

    // check if the cart belongs to the user

    if (cart.user.toString() !== user.toString()) {
        throw new ApiError(403, 'you are not allowed to access this cart');
    }

    // get the restaurant id from the cart

    const restaurantId = cart.items[0].restaurant;


    // get items from the cart

    const OrderItems = cart.items.map(item => {
        return {
            menuItem: item.menuItem,
            quantity: item.quantity,
        }
    });

    // get the total price

    const total_price = cart.totalPrice;

    // get the delivery fee

    // const delivery_fee = await deliveryService.getDeliveryFee(restaurantId);

    const delivery_fee = 100;

    // get the total amount

    const total_amount = total_price + delivery_fee;

    const order = {
        user,
        restaurant: restaurantId,
        cartId,
        OrderItems,
        delivery_instructions,
        total_price,
        delivery_fee,
        total_amount
    }

    // create the order

    const newOrder = await orderService.createOrder(order);
    if (newOrder) {
        await cartService.updateCartStatus(cartId, 'ordered');
    }

    res.status(201).json({ status: 'success', data: { order: newOrder } });

})



// update order_status 

const updateOrderStatus = catchAsync(async (req, res) => {
    const { orderId } = req.params;
    const { order_status } = req.body;

    if (!order_status) {
        throw new ApiError(400, 'order_status is required');
    }

    const updatedOrder = await orderService.updateOrderById(orderId, order_status);
    if (!updatedOrder) {
        throw new ApiError(404, 'Order not found');
    }

    res.status(200).json({ status: 'success', message: 'Order status updated successfully'});

})


// get orders by orderID

const getOrderById = catchAsync(async (req, res) => {
    const { orderId } = req.params;

    const order = await orderService.getOrderById(orderId);
    if (!order) {
        throw new ApiError(404, 'Order not found');
    }

    res.status(200).json({ status: 'success', data: { order } });

})


// get all orders

const getAllOrders = catchAsync(async (req, res) => {
    const orders = await orderService.getAllOrders();

    res.status(200).json({ status: 'success', data: { orders } });

})


// get all user orders

const getAllUserOrders = catchAsync(async (req, res) => {
    const user = req.user._id;

    const orders = await orderService.getAllUserOrders(user);

    res.status(200).json({ status: 'success', data: { orders } });

})



module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    getAllUserOrders
}