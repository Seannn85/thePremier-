import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import "./App.css";




const API_BASE_URL = "http://localhost:7000/api/";

// const token = Cookies.get('access_token');



export const teamApi = createApi({
  
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: () => "/",
      transformResponse: (response) => response.message,
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidates: [200, 201, 204, 400, 401, 403, 404, 500], // add the error status codes here
      options: {
        throwOnError: true,
      },
      transformResponse: (response) => {
Cookies.set("access_token", response.access_token); // add this line to set the token in the cookie
return response;


      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
 
    logout: builder.mutation({
      query: async () => {
        const response = await fetch("http://localhost:7000/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        return { data };
      },
      transformResponse: (response) => {
        Cookies.remove("access_token");
    
        return response;
      },
    }),
    

    getTopic: builder.query({
      query: () => "/topic",
      transformResponse: (response) => response.data,
    }),
    writeTopic: builder.mutation({
      query: (credentials) => ({
        url: "/topic/add",
        method: "POST",
        body: credentials,
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
          "Content-Type": "application/json",
        },
      }),

      transformResponse: (response) => response.data,
    }),
    searchTopic: builder.mutation({
      query: (credentials) => ({
        url: "/topic/search",
        method: "POST",
        body: credentials,
      }),

      transformResponse: (response) => response.data,
    }),
    writeMessage: builder.mutation({
      query: ({ topic_id, credentials }) => ({
        url: `/topic/${topic_id}/messages`,
        method: "POST",
        body: credentials,
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => response.data,
    }),
   
    edit: builder.mutation({
      query: (credentials) => ({
        url: "/auth/edit",
        method: "PUT",
        body: credentials,
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
          "Content-Type": "application/json",
        },
        
      }),
      
    }),
    likeMessage: builder.mutation({
      query: ({ topic_id, message_id }) => ({
        url: `/topic/${topic_id}/messages/${message_id}/like`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => response.data,
    }),
    unLikeMessage: builder.mutation({
      query: ({ topic_id, message_id }) => ({
        url: `/topic/${topic_id}/messages/${message_id}/unlike`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => response.data,
    }),

    likeTopic: builder.mutation({
      query: ({id}) => ({
        url: `/topic/${id}/like`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => response.data,
    }),
    unLikeTopic: builder.mutation({
      query: ({id}) => ({
        url: `/topic/${id}/unlike`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response) => response.data,
    }),
  }),

});

export const {
  useGetTeamQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetTopicQuery,
  useWriteTopicMutation,
useWriteMessageMutation,
  useSearchTopicMutation,
  useGetMessagesByTopicSlugQuery,
  useLogoutMutation,
  useEditMutation,
  useLikeMessageMutation,
  useUnLikeMessageMutation,
  useLikeTopicMutation,
  useUnLikeTopicMutation,

} = teamApi;
