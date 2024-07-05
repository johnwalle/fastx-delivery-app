const { Schema, model } = require('mongoose');
const validator = require('validator')


const userSchema = new Schema({

    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin', 'super-admin']
    }
}, { timestamps: true });

module.exports = model('User', userSchema);