// all endpoints to work with backend
import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users'

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
            }),
            
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            }),
        }),
        deleteUserReview: builder.mutation({
            query: (id) => ({
                url: `${USERS_URL}/profile/reviews/review/${id}`,
                method: 'DELETE'
            })
        }),
        updateUserReview: builder.mutation({
            query: ({ _id, review, rating }) => ({
                url: `${USERS_URL}/profile/reviews/review/${_id}`,
                method: 'PUT',
                body: { review, rating }
            })
        }),
        getUserReviews: builder.mutation({
                query: () => ({
                    url: `${USERS_URL}/profile/reviews/all`,
                    method: 'GET',
                })
        })
    })
})
//convention for mutations
export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation, useDeleteUserReviewMutation, useUpdateUserReviewMutation, useGetUserReviewsMutation } = usersApiSlice;