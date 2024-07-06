const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/review.controller')
const auth = require('../Middleware/authMiddleware')

router.get('/:id', reviewController.getReviewById)
router.get('/item/:itemId', reviewController.getItemReviews)
router.post('/create/:itemId', auth.requireSignIn, reviewController.createReview)
router.put('/update/:id', auth.requireSignIn, reviewController.updateReview)
router.delete('/delete/:id', auth.requireSignIn, reviewController.deleteReview)


module.exports = router