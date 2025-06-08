import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './paginationSlice';
import { hospitalApi } from '../api/hospitalApi';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    [hospitalApi.reducerPath]: hospitalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(hospitalApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
