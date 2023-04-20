import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import './App.css';

const API_BASE_URL = 'http://localhost:7000/api/';

export const teamApi = createApi({
    reducerPath: 'teamApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
      getTeam: builder.query({
        query: () => '/',
        transformResponse: (response) => response.message,
      }),
    }),
  });
  

  export const { useGetTeamQuery } = teamApi;


