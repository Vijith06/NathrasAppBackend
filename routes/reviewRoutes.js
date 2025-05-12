const express = require('express');
const { addReview, getReviews } = require('../controllers/reviewController');
const router = express.Router();

// Add a Review
router.post('/reviews', addReview);

// Get Reviews of a Product
router.get('/reviews/:productId', getReviews);

module.exports = router;
