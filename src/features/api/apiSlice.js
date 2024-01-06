import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-manager-service-av12.onrender.com",
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
