import mongoose from "mongoose";
import Product from './prouductModel.js'
const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        min: 1, 
        max: 5,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'user',
        select: 'name'
    });
    next();
});

reviewSchema.statics.calcAverageRatings = async function (productId) {
    const stats = await this.aggregate([
        {
            $match: { product: productId }
        },
        {
            $group: {
                _id: '$product',
                nReviews: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);
    console.log(stats);

    await Product.findByIdAndUpdate(productId, {
        reviewCount: stats[0].nReviews,
        avarageRating: stats[0].avgRating,
    })
}

reviewSchema.post('save', function () {
    this.constructor.calcAverageRatings(this.product);
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;