const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const cloudinary = require('../config/cloudinary.config')
const httpStatus = require('http-status');
const menuItemsService = require('../services/menuItem.service');
const restaurantService = require('../services/restaurant.service');
const Restaurant = require('../models/restaurant.schema')
// Create a new menu item

const createMenuItem = catchAsync(async (req, res) => {


    const { name, description, price, category, tags, rating, restaurantEmail } = req.body;
    const imageFile = req.file.buffer;

    const uploadImage = () => {
        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: 'Restaurants',
                        resource_type: 'image'
                    },
                    (error, result) => {
                        if (error) {
                            console.error(error);
                            reject("Failed to upload image to Cloudinary");
                        } else {
                            console.log("Image uploaded successfully!");
                            resolve(result.secure_url);
                        }
                    }
                )
                .end(imageFile);
        });
    };

    const imageUrl = await uploadImage();

    const restaurant = await restaurantService.getRestaurantByEmail(restaurantEmail);
    if (!restaurant) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
    }


    const menuItems = {
        name,
        description,
        price,
        category,
        rating,
        tags,
        restaurant: restaurant._id,
        image: imageUrl
    };

    await menuItemsService.createMenuItems(menuItems);
    res.status(httpStatus.CREATED).json({
        status: 'success',
        message: 'Menu Item created successfully',
    })
});


// get menu items by id 

const getMenuItemById = catchAsync(async (req, res) => {
    const { itemId } = req.params;
    const menuItem = await menuItemsService.getMenuItemById(itemId);
    if (!menuItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Menu Item not found');
    }
    res.status(httpStatus.OK).json(menuItem)
});

// get menu items of a restaurant

const getMenuItemsByRestaurant = catchAsync(async (req, res) => {
    const { restaurantId } = req.params;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
        res.status(404).json({ message: 'Restaurant not found' })
    }
    const menuItems = await menuItemsService.getMenuItemsByRestaurant(restaurantId);
    if (!menuItems) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Menu Items not found');
    }
    res.status(httpStatus.OK).json(menuItems)
});


// get all menu items

const getAllMenu = catchAsync(async (req, res) => {
    const menuItems = await menuItemsService.getAllMenu();
    res.status(httpStatus.OK).json(menuItems)
});

// delete menu item

const deleteMenuItem = catchAsync(async (req, res) => {
    const { itemId } = req.params;
    const menuItem = await menuItemsService.getMenuItemById(itemId);
    if (!menuItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Menu Item not found');
    }
    await menuItemsService.deleteMenuItem(itemId);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Menu Item deleted successfully'
    });
});


// update menu item

const updateMenuItem = catchAsync(async (req, res) => {

    const  menuId  = req.params.menuId;
    let menuItem = await menuItemsService.getMenuItemById(menuId);
    if (!menuItem) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Menu item not found');
    }

    const { name, description, price, category, tags, rating } = req.body;


    if (req.file) {
        const imageFile = req.file.buffer;

        const uploadImage = () => {
            return new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        {
                            folder: 'Restaurants',
                            resource_type: 'image'
                        },
                        (error, result) => {
                            if (error) {
                                console.error(error);
                                reject("Failed to upload image to Cloudinary");
                            } else {
                                console.log("Image uploaded successfully!");
                                resolve(result.secure_url);
                            }
                        }
                    )
                    .end(imageFile);
            });
        };

        const imageUrl = await uploadImage();
        menuItem.image = imageUrl;
    }

    // check if the email is already taken


    menuItem.name = name;
    menuItem.price = price;
    menuItem.category = category;
    menuItem.description = description;
    menuItem.tags = tags;
    menuItem.rating = rating;


    const updatedMenuItem = await menuItemsService.updateMenuItem(menuId, menuItem);

    res.status(httpStatus.OK).json({
        message: 'Menu item updated successfully',
        updatedMenuItem: updatedMenuItem
    });
});


module.exports = {
    createMenuItem,
    getMenuItemsByRestaurant,
    getMenuItemById,
    getAllMenu,
    deleteMenuItem,
    updateMenuItem
}   