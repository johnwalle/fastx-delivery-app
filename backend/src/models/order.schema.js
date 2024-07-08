const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cartId: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    OrderItems: [{
        menuItem: {
            type: Schema.Types.ObjectId,
            ref: 'Menu',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
    }],
    delivery_instructions: { type: String },
    order_status: {
        type: String,
        enum: ['placed', 'preparing', 'on the way', 'delivered'],
        default: 'placed',
    },
    total_price: {
        type: Number,
        required: true
    },
    delivery_fee: {
        type: Number,
        required: true,
        default: 0
    },
    total_amount: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Order = model('Order', orderSchema);

module.exports = Order;