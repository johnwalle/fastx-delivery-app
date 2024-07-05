const Menu = require('../models/menuItems.schema');

// create a new restaurant

const createMenuItems = async (body) => {
    const restaurant = await Menu.create(body);
    return restaurant;
}

// get menu items by id 

const getMenuItemById = async (id) => {
    const menuItems = await Menu.findById(id);
    return menuItems;
}

// get menu items of a restaurant

const getMenuItemsByRestaurant = async (restaurantId) => {
    const menuItems = await Menu.find({ restaurant: restaurantId });
    return menuItems;
}



// get all menus items

const getAllMenu = async () => {
    const menuItems = await Menu.find();
    return menuItems;
}

// delete menu items

const deleteMenuItem = async (id) => {
    const menuItem = await Menu.findByIdAndDelete(id);
    return menuItem;
}

// update menu item

const updateMenuItem = async (menuId, updateData) => {
    try {
        const updatedItem = await Menu.findByIdAndUpdate(menuId, updateData, {
            new: true,
        }).exec();
        return updatedItem;
    } catch (error) {
        // Handle any potential error
        throw new Error("Failed to update menu item");
    }
};
module.exports = {
    createMenuItems,
    getMenuItemById,
    getMenuItemsByRestaurant,
    getAllMenu,
    updateMenuItem,
    deleteMenuItem
}