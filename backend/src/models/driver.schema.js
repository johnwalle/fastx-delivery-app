// models/driver.js
const { Schema, model } = require('mongoose');
const validator = require('validator')


const driverSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                const phoneRegex = /^\+251\s\d{2}\s\d{3}\s\d{4}$/;
                return phoneRegex.test(value);
            },
            message: 'Please enter a valid phone number in the format: +251 [area code] [phone number]'
        },
        // Add custom error handling
        set: function (value) {
            const phoneRegex = /^\+251\s\d{2}\s\d{3}\s\d{4}$/;
            if (!phoneRegex.test(value)) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid phone number format');
            }
            return value;
        }
    },
    vehicle: {
        type: String,
        enum: ['motorcycle', 'bicycle', 'car'],
        default: 'bicycle',
        required: true
    },
    total_deliveries: {
        type: Number,
        default: 0
    },
    successful_deliveries: {
        type: Number,
        default: 0
    },
}, { timestamps: true });



module.exports = model('Driver', driverSchema);;