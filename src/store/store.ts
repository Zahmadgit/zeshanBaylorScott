import {configureStore} from '@reduxjs/toolkit';
import paginationReducer from './paginationSlice';
import {hospitalApi} from '../api/hospitalApi';
import flaggedHospitalsReducer from './flaggedHospitalsSlice';

export const store = configureStore({
  reducer: {
    // Add my custom pagination slice to the store
    pagination: paginationReducer,
    // Add the RTK Query API slice for hospital data
    [hospitalApi.reducerPath]: hospitalApi.reducer,
    // Add my slice for managing flagged hospitals
    flaggedHospitals: flaggedHospitalsReducer,
  },
  // Add the RTK Query middleware for caching, fetching, what is fetch and axios anyways, tanstack who?.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(hospitalApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
