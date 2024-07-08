const Cart = require('../models/cart.schema');
const menuItemService = require('./menuItem.service');
const ApiError = require('../utils/apiError');


// get cart by user id  

const getCartByUserId = async (userId) => {
    const cart = Cart.findOne({ user: userId });
    return cart;
}

// get cart by id

const getCartById = async (cartId) => {
    const cart = Cart.findById(cartId);
    return cart;
}

// create new cart 

const createCart = async (userId, menuItemId, quantity, restaurantId) => {
    // Find the menu item
    let cart = await getCartByUserId(userId);
    if (!cart || cart.status !== 'pending') {
        cart = new Cart({ user: userId });
    }

    if (cart?.items.length > 0) {
        const isRestaurantMatched = cart.items.every(item => item.restaurant.toString() === restaurantId.toString());
        if (!isRestaurantMatched) {
            throw new ApiError(400, 'Cannot add items from different restaurants to the same cart');
        }
    }

    // getting the menu item by id
    const menuItem = await menuItemService.getMenuItemById(menuItemId);

    // Check if the item is already in the cart
    const existingItem = cart.items.find(item => item.menuItem.toString() === menuItemId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            restaurant: menuItem.restaurant,
            menuItem: menuItemId,
            quantity,
            price: menuItem.price
        });
    }

    // Calculate the total price
    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    // save the cart
    await cart.save();

    return cart;
}


// remove item from cart

const removeFromCart = async (userId, menuItemId) => {
    // Find the user's cart
    const cart = await getCartByUserId(userId);
    if (!cart) {
        return null;
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(item => item.menuItem.toString() === menuItemId);
    if (itemIndex === -1) {
        throw new ApiError(404, 'Item not found in cart');
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Calculate the total price
    cart.totalPrice = cart.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    // Save the cart
    await cart.save();

    return cart;
}


// clear cart

const clearCart = async (userId) => {
    const cart = await getCartByUserId(userId);
    if (!cart) {
        return null;
    }

    cart.items = [];
    cart.totalPrice = 0.00;
    await cart.save();

    return cart;
}

// update cart status by id

const updateCartStatus = async (cartId, status) => {
    const cart = await getCartById(cartId);
    if (!cart) {
        throw new ApiError(404, 'Cart not found');
    }

    cart.status = status;
    await cart.save();

    return cart;
}




module.exports = {
    getCartByUserId,
    createCart,
    removeFromCart,
    clearCart,
    getCartById,
    updateCartStatus
};


