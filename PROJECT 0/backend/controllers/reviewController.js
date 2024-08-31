import asyncHandler from 'express-async-handler';
import Review from '../models/reviewModel.js';
// @desc GET ALL REVIEWS
// route GET /api/reviews/all
// @access public
const getAllReviews = asyncHandler(async (req, res) => {
    let filter = {};
    
    if (req.params.productId) filter = { product: req.params.productId}
    
    if (req.user) filter = { user: req.user.id }

    const review = await Review.find(filter);

    res.status(200).json(review);
});

// @desc CREATE REVIEW
// route POST /api/reviews
// @access private
const createReview = asyncHandler(async (req, res) => {

    if(!req.body.product) req.body.product = req.params.productId; 
    if(!req.body.user) req.body.user = req.user.id; 

    const { review, rating, product, user } = req.body;

    const newReview = await Review.create({ review, rating, product, user });
    
    if(newReview) {
        res.status(201).json({
            _id: review._id,
            rating: rating.rating,
            product: review.product,
            user: review.user
        });
    } else {
        res.status(400);
        throw new Error('Invalid review data');
    }
});

// @desc GET REVIEW
// route POST /api/reviews/review
// @access public
const getReview = asyncHandler(async (req, res) => {
    try{
        const review = await Review.findById( req.params.id );
        res.status(200).json(review);

    } catch(error) {
        res.status(500)
        throw new Error('Something went wrong!');
    }

});

// @desc DELETE REVIEW
// route POST /api/reviews/review:id
// @access private
const deleteReview = asyncHandler(async (req, res) => {

    try {
        const review = await Review.findById(req.params.id);

        if (review) {
            await Review.deleteOne(review);
            getAllReviews(req, res);
        } else {
            res.status(404);
            throw new Error('Review not found');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

// @desc UPDATE REVIEW 
// route PUT /api/reviews/review:id
// @access private
const updateReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if(review) {
        review.review = req.body.review || product.review;
        review.rating = req.body.rating || product.rating;

        const updatedReview = await review.save();
        
        getAllReviews(req, res);
        
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export {
    createReview,
    getAllReviews,
    getReview,    
    deleteReview,
    updateReview
}