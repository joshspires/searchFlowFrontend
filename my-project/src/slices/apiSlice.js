import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseURL ='https://searchflow-ed703fb051f2.herokuapp.com'
// const baseURL = "http://localhost:3003";

// const baseURL = "/api"; // No need to hard-code the backend URL
const baseQuery = fetchBaseQuery({ baseUrl: baseURL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
