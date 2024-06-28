const { Schema, model } = require('mongoose');
const tokenTypes = require('../config/tokens');


const tokenSchema = new Schema({

    token: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: [tokenTypes.ACESSS, tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD],
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
    blacklisted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


module.exports = model('Token', tokenSchema);