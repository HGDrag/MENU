import { createSlice } from '@reduxjs/toolkit';

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
            state.userInfo.reviews = action.payload;
            console.log(action.payload);

            // Retrieve the userInfo from localStorage
            const storage = localStorage.getItem('userInfo');
            if (storage) {
                const user = JSON.parse(storage);

                // Update the reviews in the user object
                user.reviews = action.payload;

                // Save the updated user object back to localStorage
                localStorage.setItem('userInfo', JSON.stringify(user));

                // Update the state with the updated user object
                state.userInfo = user;
            } else {
                console.error('No userInfo found in localStorage');
            }
        }

    },
});

export const { setCredentials, logout, setReviews, updateReviews } = authSlice.actions;

export default authSlice.reducer;
