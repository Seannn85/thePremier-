import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import './App.css';



const API_BASE_URL = 'http://localhost:7000/api/';
// const token = Cookies.get('access_token');



export const teamApi = createApi({
    reducerPath: 'teamApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
      getTeam: builder.query({
        query: () => '/',
        transformResponse: (response) => response.message,
      }),
      login: builder.mutation({
        query: (credentials) => ({
          url: '/auth/login',
          method: 'POST',
          body: credentials,
        }),
        invalidates: [200, 201, 204, 400, 401, 403, 404, 500], // add the error status codes here
        options: {
          throwOnError: true,
        },
        transformResponse: (response) => {
          Cookies.set('access_token', response.access_token); // add this line to set the token in the cookie
          return response;
      },
      }),
      register: builder.mutation({
        query: (credentials) => ({
          url: '/auth/register',
          method: 'POST',
          body: credentials,
        }),
      }),
      getTopic: builder.query({
        query: () => '/topic',
        transformResponse: (response) => response.data,
      }),
      writeTopic: builder.mutation({
        query: (credentials) => ({
          url: '/topic/add',
          method: 'POST',
          body: credentials,
          headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
            'Content-Type': 'application/json',

          }
        }),
        
        transformResponse: (response) => response.data,


      }),
      searchTopic: builder.mutation({
        query: (credentials) => ({
          url: '/topic/search',
          method: 'POST',
          body: credentials
       
        }),
        
        transformResponse: (response) => response.data,
      

      }),
      writeMessage: builder.mutation({
        query: ({ topic_id , credentials }) => ({
            url: `/topic/${topic_id}/messages`,
            method: 'POST',
            body: credentials,
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`,
                'Content-Type': 'application/json',
            }
        }),
        transformResponse: (response) => response.data,
    }),
    getMessagesByTopicSlug: builder.query({
      query: (slug) => `/message/${slug}/messages`,
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
  useWriteMessageMutation,useSearchTopicMutation,useGetMessagesByTopicSlugQuery
} = teamApi;

