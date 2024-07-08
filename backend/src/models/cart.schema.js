const { Schema, model } = require("mongoose");

// Define the Cart Schema
const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalPrice: { type: Number, default: 0.00 },
    items: [
        {
            restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
            menuItem: { type: Schema.Types.ObjectId, ref: 'Menu', required: true },
            quantity: { type: Number, required: true, min: 1, default: 1 },
            price: { type: Number, required: true }
        }
    ],
    status: { type: String, enum: ['pending', 'ordered', 'delivered'], default: 'pending' },
}, { timestamps: true });

// Create the Cart model
const Cart = model('Cart', CartSchema);

module.exports = Cart;