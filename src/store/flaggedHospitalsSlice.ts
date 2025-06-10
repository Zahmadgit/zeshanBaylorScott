import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// Define the structure for a flagged hospital
interface FlaggedHospital {
  id: string;
  hospital_name: string;
  hospital_state: string;
  collection_week: string;
  address: string;
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
    // Add a hospital to the flagged list if it's not already in there
    addFlaggedHospital: (state, action: PayloadAction<FlaggedHospital>) => {
      const existingHospital = state.flaggedHospitals.find(
        h => h.id === action.payload.id,
      );
      if (!existingHospital) {
        state.flaggedHospitals.push(action.payload);
      }
    },
    // Remove a hospital from the flagged list by its ID
    removeFlaggedHospital: (state, action: PayloadAction<string>) => {
      state.flaggedHospitals = state.flaggedHospitals.filter(
        h => h.id !== action.payload,
      );
    },
  },
});
// For use in components
export const {addFlaggedHospital, removeFlaggedHospital} =
  flaggedHospitalsSlice.actions;
// For use in store
export default flaggedHospitalsSlice.reducer;
