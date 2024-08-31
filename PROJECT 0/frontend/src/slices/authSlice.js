import { createSlice } from '@reduxjs/toolkit';
import { updateReview } from '../../../backend/controllers/reviewController';

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
        setReviews: (state, action) => {
            state.userInfo.reviews =  action.payload
        } ,
        updateReviews: (state, action) => {
            const { reviewId, newReview } = action.payload;
            console.log('Updating review with ID:', reviewId, 'New review:', newReview);
            state.userInfo.reviews = state.userInfo.reviews.map(review => 
                review._id === reviewId ? { ...review, ...newReview } : review
            );
            console.log('Updated reviews:', state.userInfo.reviews);
        }
    },
});

export const { setCredentials, logout, setReviews, updateReviews } = authSlice.actions;

export default authSlice.reducer;
