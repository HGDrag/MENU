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
    },
});

export const { setCredentials, removeCredentials } = productSlice.actions;

export default productSlice.reducer;