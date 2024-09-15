import { createSlice, PayloadAction, isRejectedWithValue } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operationsUser.auth";
import { User, AuthState, AuthResponse } from "../../Interface/Interface";

const initialState: AuthState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
     .addCase(logIn.pending, (state) => {
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
      })
     .addMatcher(
        isRejectedWithValue(register),
        (state, action) => {
          state.error = action.payload as string; 
        })
    .addMatcher(isRejectedWithValue(logIn), (state, action) => {
        state.error = action.payload as string; 
      });
  },
});

export const authReducer = authSlice.reducer;