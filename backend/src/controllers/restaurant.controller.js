const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const restaurantService = require('../services/restaurant.service');
const cloudinary = require('../config/cloudinary.config')
const httpStatus = require('http-status');
// Create a new restaurant
const createRestaurant = catchAsync(async (req, res) => {

    const { name, email, cuisine_type, description, address, working_days, phone_number, operating_hours } = req.body;
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
    const restaurant = await restaurantService.getRestaurantByEmail(email);

    if (restaurant) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Restaurant with this email already exists');
    }

    const restaurants = {
        name,
        email,
        cuisine_type,
        description,
        address,
        working_days,
        phone_number,
        operating_hours,
        image: imageUrl

    };

    await restaurantService.createRestaurant(restaurants);
    res.status(httpStatus.CREATED).json({
        status: 'success',
        message: 'Restaurant created successfully',
    })
});

const getRestaurants = catchAsync(async (req, res) => {
    const restaurants = await restaurantService.getRestaurants();
    res.status(httpStatus.OK).json(restaurants);
});

// get restaurant by id
const getRestaurantById = catchAsync(async (req, res) => {

    const restId = req.params.id;
    const restaurant = await restaurantService.getRestaurantById(restId);
    if (!restaurant) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
    }
    res.status(httpStatus.OK).json(restaurant);
});


// delete restaurant

const deleteRestaurant = catchAsync(async (req, res) => {
    const restId = req.params.id;
    const restaurant = await restaurantService.getRestaurantById(restId);
    if (!restaurant) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
    }
    await restaurantService.deleteRestaurant(restId);
    res.status(httpStatus.OK).json({
        status: 'success',
        message: 'Restaurant deleted successfully'
    });
});


// update restaurant

const updateRestaurant = catchAsync(async (req, res) => {
    const restId = req.params.id;
    let restaurant = await restaurantService.getRestaurantById(restId);
    if (!restaurant) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Restaurant not found');
    }

    const { name, email, cuisine_type, description, address, working_days, phone_number, operating_hours } = req.body;


    // check if the email exist
    if (email && (!/^\S+@\S+\.\S+$/.test(email))) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid email format');
    }

    const restExist = await restaurantService.getRestaurantByEmail(email);

    if (restExist && restExist._id.toString() !== restId) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email is already taken");
    }




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
        restaurant.image = imageUrl;
    }

    // check if the email is already taken


    restaurant.name = name;
    restaurant.email = email;
    restaurant.cuisine_type = cuisine_type;
    restaurant.description = description;
    restaurant.address = address;
    restaurant.working_days = working_days;
    restaurant.phone_number = phone_number;
    restaurant.operating_hours = operating_hours;

    const updatedRestaurant = await restaurantService.updateRestaurant(restId, restaurant);

    res.status(httpStatus.OK).json({
        message: 'Restaurant updated successfully',
        updatedRestaurant: updatedRestaurant
    });
});




module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurantById,
    deleteRestaurant,
    updateRestaurant
}   