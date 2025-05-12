const Review = require('../models/Review');
const Order = require('../models/order');

// Add Review for Product
const addReview = async (req, res) => {
  const { productId, rating, comment, customerId } = req.body;

  try {
    // Log the request body for debugging
    console.log('Request Body:', req.body);

    // Check if the customer has placed an order and it was processed
    const order = await Order.findOne({
      customerId,
      productId,
      status: 'Order Processed', // Only allow review if the order is processed
    });

    console.log('Order Found:', order); // Debugging order result

    if (!order) {
      console.log('No processed order found for this customer and product');
      return res.status(400).json({ message: 'You must have a processed order to leave a review' });
    }

    const newReview = new Review({
      productId,
      customerId,
      rating,
      comment,
    });

    // Log the review before saving
    console.log('New Review to be saved:', newReview);

    await newReview.save();

    // Log success after saving
    console.log('Review saved successfully');

    // Update product average rating after review submission
    const reviews = await Review.find({ productId });
    console.log('All Reviews for the Product:', reviews); // Debugging reviews fetched

    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    console.log('Calculated Average Rating:', avgRating); // Debugging average calculation

    // You can update the product's rating in the product model here if necessary

    res.status(201).json({ message: 'Review added successfully', review: newReview });
  } catch (err) {
    // Log the error
    console.error('Error in addReview:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Reviews for Product
const getReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    console.log('Fetching reviews for product ID:', productId); // Debugging product ID

    const reviews = await Review.find({ productId })
      .populate('customerId', 'name') // Populating customer details
      .exec();

    console.log('Fetched Reviews:', reviews); // Debugging reviews fetched

    res.status(200).json(reviews);
  } catch (err) {
    // Log the error
    console.error('Error in getReviews:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addReview, getReviews };
