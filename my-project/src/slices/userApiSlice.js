import { apiSlice } from './apiSlice';
const USERS_URL = '/api/userManagementRoutes';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/createUser`,
        method: 'POST',
        body: data,
      }),
     }),

  }),
});

export const { useLoginMutation , useRegisterMutation } = userApiSlice;