import {createSlice, PayloadAction} from '@reduxjs/toolkit';


// Define what our pagination state looks like
interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  allItems: any[]; // Bit lazy, generic at home brand
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
    // Set the current page number
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // Set how many items we want per page
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    // Set total number of items (for pagination UI)
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
