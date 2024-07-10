const catchAsync = require('../utils/catchAsync');
const driverService = require('../services/driver.service');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status');

// Create a new driver

const createDriver = catchAsync(async (req, res) => {

    const { fullName, phone_number, vehicle } = req.body;

    if (!fullName || !phone_number || !vehicle) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide all required fields');
    }

    if (fullName && fullName.split(' ').length < 2) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide both first name and last name');
    }

    const driverDetail = {
        fullName,
        phone_number,
        vehicle
    }


    const driver = await driverService.createDriver(driverDetail);

    if (!driver) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Driver not created');
    }
    res.status(httpStatus.CREATED).json({
        success: true, message: 'Driver created successfully'
    });
});



// get driver by id

const getDriverById = catchAsync(async (req, res) => {
    const { driverId } = req.params;

    const driver = await driverService.getDriverById(driverId);

    if (!driver) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Driver not found');
    }

    res.status(httpStatus.OK).json({
        success: true, driver
    });
});


// get all drivers

const getAllDrivers = catchAsync(async (req, res) => {
    const drivers = await driverService.getAllDrivers();

    if (!drivers) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Drivers not found');
    }

    res.status(httpStatus.OK).json({
        success: true, drivers
    });
});




// update driver by id

const updateDriverById = catchAsync(async (req, res) => {
    const { driverId } = req.params;

    const driver = await driverService.getDriverById(driverId);

    if (!driver) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Driver not found');
    }

    const { fullName, phone_number, vehicle } = req.body;

    if (fullName && fullName.split(' ').length < 2) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide both first name and last name');
    }

    const updateBody = {
        fullName,
        phone_number,
        vehicle
    }

    const updatedDriver = await driverService.updateDriverById(driverId, updateBody);

    if (!updatedDriver) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Driver not updated');
    }

    res.status(httpStatus.OK).json({
        success: true, message: 'Driver updated successfully'
    });
});

// delete driver

const deleteDriver = catchAsync(async (req, res) => {
    const { driverId } = req.params;

    const driver = await driverService.getDriverById(driverId);

    if (!driver) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Driver not found');
    }

    const deletedDriver = await driverService.deleteDriver(driverId);

    if (!deletedDriver) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Driver not deleted');
    }

    res.status(httpStatus.OK).json({
        success: true, message: 'Driver deleted successfully'
    });
});


module.exports = {
    createDriver,
    getDriverById,
    getAllDrivers,
    updateDriverById,
    deleteDriver
}
