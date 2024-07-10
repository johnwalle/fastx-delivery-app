const Driver = require('../models/driver.schema')
const ApiError = require('../utils/apiError')

// create new driver

const createDriver = async (driverDetails) => {
    const driver = await Driver.create(driverDetails);
    return driver;
}


// get all drivers

const getAllDrivers = async () => {
    const drivers = await Driver.find();
    return drivers;
}

// get driver by id

const getDriverById = async (driverId) => {
    const driver = await Driver.findById(driverId);
    return driver;
}


// update driver by id

const updateDriverById = async (driverId, updateBody) => {
    console.log('updated-bdy', driverId, updateBody)

    try {
        const updatedDriver = await Driver.findByIdAndUpdate(driverId, updateBody, {
            new: true,
        }).exec();
        return updatedDriver;
    } catch (error) {
        // Handle any potential error
        throw new ApiError(400, "Failed to update the driver");
    }
}



// delete driver 

const deleteDriver = async (driverId) => {
    const driver = await Driver.findByIdAndDelete(driverId);
    return driver;
}


module.exports = {
    createDriver,
    getAllDrivers,
    getDriverById,
    updateDriverById,
    deleteDriver
}