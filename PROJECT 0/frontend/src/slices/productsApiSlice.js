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
        }),
        delete: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/product/${id}/delete`,
                method: 'DELETE',
            })
        }), 
    })
})

export const {useAllProductsMutation, useCreateMutation, useDeleteMutation} = productsApiSlice;