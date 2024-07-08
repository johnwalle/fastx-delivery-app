const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/apiError.js');
const menuItemService = require('../services/menuItem.service');
const cartService = require('../services/cart.service');



// get cart by user id

const getCart = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const cart = await cartService.getCartByUserId(userId);
    if (!cart) {
        throw new ApiError(404, 'Cart not found');
    }
    res.status(200).json({ status: 'success', data: { cart } });
});

// create cart
// Add an item to the cart

const addToCart = catchAsync(async (req, res) => {
    const { menuItemId, quantity } = req.body;
    const userId = req.user._id;

    if (!menuItemId || !quantity) {
        throw new ApiError(400, 'Menu item id and quantity are required');
    }

    // Find the menu item

    const menuItem = await menuItemService.getMenuItemById(menuItemId);
    if (!menuItem) {
        throw new ApiError(404, 'Menu item not found');
    }

    const restaurantId = menuItem.restaurant;

    // Find or create the user's cart
    const cart = await cartService.createCart(userId, menuItemId, quantity, restaurantId);
    if (!cart) {
        throw new ApiError(400, 'Error adding item to cart');
    }
    res.status(201).json({ status: 'success', message: 'Item added to cart' });
});


// remove item from cart

const removeFromCart = catchAsync(async (req, res) => {
    const { menuItemId } = req.body;
    const userId = req.user._id;

    // Find the menu item



    const menuItem = await menuItemService.getMenuItemById(menuItemId);
    if (!menuItem) {
        throw new ApiError(404, 'Menu item not found');
    }

    // Find or create the user's cart
    const cart = await cartService.removeFromCart(userId, menuItemId);
    if (!cart) {
        throw new ApiError(400, 'Error removing item from cart');
    }
    res.status(201).json({ status: 'success', message: 'Item removed from cart' });
});

// clear the cart

const clearCart = catchAsync(async (req, res) => {
    const userId = req.user._id;
    const cart = await cartService.clearCart(userId);
    if (!cart) {
        throw new ApiError(400, 'Error clearing cart');
    }
    res.status(200).json({ status: 'success', message: 'Cart cleared' });
});





module.exports = {
    addToCart,
    removeFromCart,
    clearCart,
    getCart

};