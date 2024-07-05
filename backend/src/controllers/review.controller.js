const User = require('../models/user.schema')
const Menu = require('../models/menu.schema')
const catchAsync = require('../utils/catchAsync')
const reviewService = require('../services/review.service')
const userService = require('../services/user.service')

// GET /reviews: Get a list of all reviews.
const getAllReviews = catchAsync(async (req, res) => {
    const reviews = await reviewService.getAllReviews()
    res.json(reviews)
})



// GET /reviews/:id: Get a specific review by its ID
const getReviewById = catchAsync(async (req, res) => {

    const review = await reviewService.getReviewById(req.params.id)
    if (!review) {
        return res.status(404).json({ message: 'Review not found' })
    }
    res.json(review)
})



// POST /reviews: Create a new review.

const createReview = catchAsync(async (req, res) => {

    const userId = req.user._id.toString();

    const { menuItem, rating, comment } = req.body;

    const review = {
        user: userId,
        menuItem,
        rating,
        comment
    }

    const newReview = await reviewService.createReview(review)
    res.status(201).json(newReview)

})



// PUT /reviews/:id: Update a specific review by its ID.

const updateReview = catchAsync(async (req, res) => {

    const userId = req.user._id.toString();
    const review = await reviewService.getReviewById(req.params.id)

    if (!review) {
        return res.status(404).json({ message: 'Review not found' })
    }

    if (review.user.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to update this review' })
    }

    const { menuItem, rating, comment } = req.body;

    const updateReview = {
        menuItem,
        rating,
        comment
    }

    const updatedReview = await reviewService.updateReview(updateReview)
    res.json(updatedReview)

});




// DELETE /reviews/:id: Delete a specific review by its ID.

const deleteReview = catchAsync(async (req, res) => {

    const userId = req.user._id.toString();
    const review = await reviewService.getReviewById(req.params.id)

    if (!review) {
        return res.status(404).json({ message: 'Review not found' })
    }

    if (review.user.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to delete this review' })
    }

    await reviewService.deleteReview(req.params.id)
    res.status(204).end()

});


module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
}