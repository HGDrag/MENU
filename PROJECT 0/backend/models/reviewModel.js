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

// reviewSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'user',
//         select: 'name'
//     });
//     next();
// });

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

    await Product.findByIdAndUpdate(productId, {
        reviewCount: stats[0].nReviews,
        avarageRating: stats[0].avgRating,
    })
}

reviewSchema.post('save', function () {
    this.constructor.calcAverageRatings(this.product);
});

// reviewSchema.pre(/^findOneAnd/, async function (next) {
//     this.r = await this.findOne()
//     console.log(r)
//     next();
// });

// reviewSchema.post(/^findOneAnd/, async function () {
//     await this.r.constructor.calcAverageRatings(this.r.product)
// });


const Review = mongoose.model('Review', reviewSchema);

export default Review;