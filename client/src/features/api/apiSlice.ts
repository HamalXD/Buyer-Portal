import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Properties", "Favourites"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    register: builder.mutation({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    getProperties: builder.query<any[], void>({
      query: () => "/properties",
      providesTags: ["Properties"],
    }),
    getFavourites: builder.query<any[], void>({
      query: () => "/favourites",
      providesTags: ["Favourites"],
    }),
    addFavourite: builder.mutation({
      query: (id) => ({ url: `/favourites/${id}`, method: "POST" }),
      invalidatesTags: ["Favourites"],
    }),
    removeFavourite: builder.mutation({
      query: (id) => ({ url: `/favourites/${id}`, method: "DELETE" }),
      invalidatesTags: ["Favourites"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetPropertiesQuery,
  useGetFavouritesQuery,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} = apiSlice;
