import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    reviewCount: {
        type: Number,
        // required: true,
        default: 0
    },
    avarageRating: {
        type: Number,
        default: 4.5,
        min: 1, 
        max: 5,
    }
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
},
);
//VIRTUAL POPULATE
productSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'product',
    localField: '_id'
});



const Product = mongoose.model('Product', productSchema);

export default Product;

