import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  allItems: any[];
}

const initialState: PaginationState = {
  currentPage: 1,
  itemsPerPage: 10,
  totalItems: 0,
  allItems: [],
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    addItems: (state, action: PayloadAction<any[]>) => {
      state.allItems = [...state.allItems, ...action.payload];
      state.totalItems = state.allItems.length;
    },
    resetPagination: () => initialState,
  },
});

export const { setPage, setItemsPerPage, setTotalItems, addItems, resetPagination } =
  paginationSlice.actions;
export default paginationSlice.reducer;
