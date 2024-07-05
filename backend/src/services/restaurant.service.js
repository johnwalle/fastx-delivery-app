const Restaurant = require('../models/restaurant.schema');


// create a new restaurant

const createRestaurant = async (body) => {
    const restaurant = await Restaurant.create(body);
    return restaurant;
}

// get all restaurants

const getRestaurants = async () => {
    const restaurants = await Restaurant.find({}).sort({ updatedAt: -1 });
    return restaurants;
}

// get Restaurant by email

const getRestaurantByEmail = async (email) => {
    const restaurant = await Restaurant.findOne({ email });
    return restaurant;
}

// get restaurant by id

const getRestaurantById = async (id) => {
    const restaurant = await Restaurant.findById(id);
    return restaurant;
}



// delete restaurant

const deleteRestaurant = async (id) => {
    const restaurant = await Restaurant.findByIdAndDelete(id);
    return restaurant;
}


// update restaurant


const updateRestaurant = async (restId, updateData) => {
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restId, updateData, {
            new: true,
        }).exec();
        return updatedRestaurant;
    } catch (error) {
        // Handle any potential error
        throw new Error("Failed to update restaurnat");
    }
};





module.exports = {
    createRestaurant,
    getRestaurants,
    getRestaurantByEmail,
    getRestaurantById,
    deleteRestaurant,
    updateRestaurant
}