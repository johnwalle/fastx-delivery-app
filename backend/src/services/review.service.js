const Review = require('../models/review.schema')

const getItemReviews = async (itemId) => {
    const reviews = await Review.find({ menuItem: itemId })
    return reviews
}

const getReviewByUserAndItemId = async (userID, menuID) => {

    const reviews = Review.find({ $and: [{ user: userID }, { menuItem: menuID }] })
    return reviews
}

const getReviewById = async (id) => {
    const review = await Review.findById(id)
    return review
}


const createReview = async (review) => {
    const newReview = await Review.create(review)
    return newReview
}



const updateReview = async (reviewId, review) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(reviewId, review, {
            new: true,
        }).exec();
        return updatedReview;
    } catch (error) {
        // Handle any potential error
        throw new Error("Failed to update the review.");
    }
};

const deleteReview = async (id) => {
    const review = await Review.findByIdAndDelete(id)
    return review
}



module.exports = {
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    getItemReviews,
    getReviewByUserAndItemId
}

