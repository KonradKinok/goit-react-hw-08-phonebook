import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FiltersState } from "../../Interface/Interface";

const filtersInitialState: FiltersState = {
  status: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState: filtersInitialState,
  reducers: {
    setStatusFilter(state: FiltersState, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
});

export const { setStatusFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
