import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Set up the API slice for fetching hospital data
export const hospitalApi = createApi({
  reducerPath: 'hospitalApi', // unique key for the reducer
  baseQuery: fetchBaseQuery({ baseUrl: 'https://healthdata.gov/resource/' }), // base URL for requests
  endpoints: builder => ({
    // Define the hospital data query endpoint
    getHospitalData: builder.query({
      // Query accepts limit and offset for pagination, defaulting to 10 and 0
      query: ({ limit = 10, offset = 0 }) =>
        `anag-cw7u.json?$limit=${limit}&$offset=${offset}`,
    }),
  }),
});

// Export the auto-generated hook for easy use in components, also neat for caching
export const { useGetHospitalDataQuery } = hospitalApi;
