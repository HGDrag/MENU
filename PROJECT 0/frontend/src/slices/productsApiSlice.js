import { apiSlice } from './apiSlice';
const PRODUCTS_URL = '/api/products';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allProducts: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/all`,
                method: 'GET',
            })
        }),
        create: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
                body: data  
            })
        })
    })
})

export const {useAllProductsMutation, useCreateMutation} = productsApiSlice;