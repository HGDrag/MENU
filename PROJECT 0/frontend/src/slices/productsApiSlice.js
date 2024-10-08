import { deleteReview } from '../../../backend/controllers/reviewController';
import { apiSlice } from './apiSlice';
const PRODUCTS_URL = '/api/products';

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        allProducts: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/all`,
                method: 'GET',
                body: data
            }),
            invalidatesTags: ['Product'],
        }),
        create: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
                body: data  
            }),
            invalidatesTags: ['Product']
        }),
        delete: builder.mutation({
            query: (id) => ({
                url: `${PRODUCTS_URL}/product/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),
        update: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/product/${data._id}/update`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Product']
        }),
        deleteProductReview: builder.mutation({
            query: ({productId, id}) => ({
                url: `${PRODUCTS_URL}/product/${productId}/reviews/review/${id}`,
                method: 'DELETE',
            }),
        }),
        createProductReview: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/product/${data.productId}/reviews`,
                method: 'POST',
                body: data
            })
        })
    })
})

export const {
    useAllProductsMutation, 
    useCreateMutation, 
    useDeleteMutation, 
    useUpdateMutation, 
    useDeleteProductReviewMutation, 
    useCreateProductReviewMutation } = productsApiSlice;