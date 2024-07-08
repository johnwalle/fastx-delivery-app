const Order = require('../models/order.schema');


// create the order 

const createOrder = async (order) => {
    const newOrder = await Order.create(order);
    return newOrder;

}

// get all orders

const getAllOrders = async () => {
    const orders = await Order.find();
    return orders;
}

// get order by id

const getOrderById = async (orderId) => {
    const order = await Order.findById(orderId);
    return order;
}

// get all users orders

const getAllUserOrders = async (userId) => {
    const orders = await Order.find({ user: userId });
    return orders;
}

// update order by id

const updateOrderById = async (orderId, status) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { order_status: status }, {
            new: true,
        }).exec();
        return updatedOrder;
    } catch (error) {
        console.error(error);
        // Handle any potential error
        throw new Error("Failed to update the order status");
    }
};




module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    getAllUserOrders
}
