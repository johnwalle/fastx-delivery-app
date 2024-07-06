const { Schema, model } = require("mongoose")

// Define the Cart Schema

const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    totalPrice: { type: Number, default: 0.00 },
    items: [
        {
            menuItem: { type: Schema.Types.ObjectId, ref: 'Menu', required: true },
            quantity: { type: Number, required: true, min: 1, default: 1 },
            price: { type: Number, required: true }
        }
    ]
}, { timestamps: true });


// Create the Cart model
const Cart = model('Cart', CartSchema);


module.exports = Cart;