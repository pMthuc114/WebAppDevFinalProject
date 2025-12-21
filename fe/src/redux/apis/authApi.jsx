import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
      }),
    }),

    registerUser: builder.mutation({
      query: (body) => ({
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
    }),

    changePassword: builder.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: '/api/auth/change-password',
        method: 'PUT',
        body: { currentPassword, newPassword },
      }),
    }),

    getAllUsers: builder.query({
      query: () => '/api/auth/users',
      providesTags: ['Users'],
    }),

    getUserById: builder.query({
      query: (id) => `/api/auth/users/${id}`,
      providesTags: ['Users'],
    }),

    createUserByAdmin: builder.mutation({
      query: (body) => ({
        url: '/api/auth/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),


    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/auth/users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Users'],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/auth/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
  useCreateUserByAdminMutation
} = authApi;
