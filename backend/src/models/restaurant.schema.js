const { Schema, model } = require('mongoose');
const validator = require('validator');
const ApiError = require('../utils/apiError');
const httpStatus = require('http-status');

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: 'Please enter a valid email'
        }
    },
    cuisine_type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        what3words_address: {
            type: String,
        },
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
            default: "Ethiopia"
        }
    },
    working_days: {
        type: [{
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        }],
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
    image: {
        type: String,
        required: true
    },
    operating_hours: {
        open: {
            type: String,
            required: true
        },
        close: {
            type: String,
            required: true
        }
    }
}, { timestamps: true });


const Restaurant = model('Restaurant', restaurantSchema);

module.exports = Restaurant;