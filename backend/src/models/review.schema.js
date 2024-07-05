const { Schema, model } = require('mongoose')

const reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    menuItem: {
        type: Schema.Types.ObjectId,
        ref: 'Menu',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = model('Review', reviewSchema)