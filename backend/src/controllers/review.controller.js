const catchAsync = require('../utils/catchAsync')
const reviewService = require('../services/review.service')
const ApiError = require('../utils/apiError')
const httpStatus = require('http-status')
const menuItemService = require('../services/menuItem.service')


// GET /reviews: Get a list of all reviews of a menu ite,
const getItemReviews = catchAsync(async (req, res) => {
    const { itemId } = req.params
    const reviews = await reviewService.getItemReviews(itemId)
    res.json(reviews)
})



// GET /reviews/:id: Get a specific review by its ID
const getReviewById = catchAsync(async (req, res) => {

    const review = await reviewService.getReviewById(req.params.id)
    if (!review) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Review not found')
    }
    res.json(review)
})



// POST /reviews: Create a new review
const createReview = catchAsync(async (req, res) => {

    const userId = req.user._id.toString();
    const { rating, comment } = req.body;
    const { itemId } = req.params;

    // check if the user reviewed before

    const reviewed = await reviewService.getReviewByUserAndItemId(userId, itemId)
    if (reviewed.length > 0) {
        return res.status(400).json({ message: 'You have already reviewed this item' })
    }


    // check if the menuitem that the user trying to review exists

    const menuItem = await menuItemService.getMenuItemById(itemId)
    if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' })
    }

    // check if all the fields are filled

    if (!rating || !comment) {
        return res.status(400).json({ message: 'please fill all the fields' })
    }



    const review = {
        user: userId,
        menuItem: itemId,
        rating,
        comment
    }
    const created = await reviewService.createReview(review)
    // update the rating attribute in the menuitem

    if (created) {
        await menuItemService.updateRating(itemId);
        res.status(201).json({ success: true, message: 'Review created successfully' })
    }


})



// PUT /reviews/:id: Update a specific review by its ID
const updateReview = catchAsync(async (req, res) => {

    const userId = req.user._id.toString();
    const review = await reviewService.getReviewById(req.params.id)

    if (!review) {
        return res.status(404).json({ message: 'Review not found' })
    }

    if (review.user.toString() !== userId) {
        return res.status(403).json({ message: 'You are not authorized to update this review' })
    }

    const { rating, comment } = req.body;

    const updateReview = {
        rating,
        comment
    }
    const updatedReview = await reviewService.updateReview(req.params.id, updateReview)

    // update the rating attribute in the menuitem

    await menuItemService.updateRating(review.menuItem);
    res.status(200).json({
        success: true,
        message: 'Review updated successfully',
        updatedReview
    })
});




// DELETE /reviews/:id: Delete a specific review by its ID
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
    // update the rating attribute in the menuitem
    await menuItemService.updateRating(review.menuItem);

    res.json({ success: true, message: 'Review deleted successfully' })
});


module.exports = {
    getItemReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
}