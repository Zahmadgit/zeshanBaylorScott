import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlaggedHospital {
  id: string;
  hospital_name: string;
  hospital_state: string;
  collection_week: string;
}

interface FlaggedHospitalsState {
  flaggedHospitals: FlaggedHospital[];
}

const initialState: FlaggedHospitalsState = {
  flaggedHospitals: [],
};

const flaggedHospitalsSlice = createSlice({
  name: 'flaggedHospitals',
  initialState,
  reducers: {
    addFlaggedHospital: (state, action: PayloadAction<FlaggedHospital>) => {
      const existingHospital = state.flaggedHospitals.find(
        (h) => h.id === action.payload.id
      );
      if (!existingHospital) {
        state.flaggedHospitals.push(action.payload);
      }
    },
    removeFlaggedHospital: (state, action: PayloadAction<string>) => {
      state.flaggedHospitals = state.flaggedHospitals.filter(
        (h) => h.id !== action.payload
      );
    },
  },
});

export const { addFlaggedHospital, removeFlaggedHospital } = flaggedHospitalsSlice.actions;
export default flaggedHospitalsSlice.reducer;
