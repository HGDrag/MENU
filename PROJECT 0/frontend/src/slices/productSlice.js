import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    productInfo: JSON.parse(localStorage.getItem('productInfo')) || [], // Initialize as an empty array
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.productInfo = [...action.payload];
                localStorage.setItem('productInfo', JSON.stringify(action.payload))
            } else {
                state.productInfo = [];
            }
        },
        removeCredentials: (state, action) => {
            state.productInfo = null;
            localStorage.removeItem('productInfo');
        },
        setProductReviews: (state, action) => {
            const storage = localStorage.getItem('productInfo');
            const products = JSON.parse(storage);

            if (!action.payload.productId) {
                console.error('ID is undefined');
                return;
            }
            
            let product = products.find(product => product._id === action.payload.productId);
        
            if (product) {
                product.reviews = action.payload.res;

                // Calculate the new average rating
                const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
                const newAverageRating = totalRating / product.reviews.length;

                // Update the product object
                product.averageRating = newAverageRating;
                product.reviewCount = product.reviews.length;

                state.productInfo = products
            } else {
                console.error('Product not found');
            }
        },
        addProductReviews: (state, action) => {
            
        }
    },
});

export const { setCredentials, removeCredentials, setProductReviews } = productSlice.actions;

export default productSlice.reducer;