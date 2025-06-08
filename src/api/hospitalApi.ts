import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const hospitalApi = createApi({
  reducerPath: 'hospitalApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://healthdata.gov/resource/'}),
  endpoints: builder => ({
    getHospitalData: builder.query({
      query: ({limit = 10, offset = 0}) =>
        `anag-cw7u.json?$limit=${limit}&$offset=${offset}`,
    }),
  }),
});

export const {useGetHospitalDataQuery} = hospitalApi;
