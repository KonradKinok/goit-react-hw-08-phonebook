import { createSlice, PayloadAction, isRejectedWithValue } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./operationsUser.auth";
import { User, AuthState, AuthResponse,RejectedAction } from "../../Interface/Interface";

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
          state.error = action.payload as string; // Obsłużenie odrzuconego błędu
          console.log("sliceUser: isRejectedWithValue state.error", state.error);
        })
    .addMatcher(isRejectedWithValue(logIn), (state, action) => {
        state.error = action.payload as string; // Obsłużenie odrzuconego błędu dla logIn
        console.log("sliceUser: isRejectedWithValue state.error (logIn)", state.error);
      });
  },
});

export const authReducer = authSlice.reducer;
// import { User, AuthState, AuthResponse } from "../../Interface/Interface";
// import { createSlice } from "@reduxjs/toolkit";
// import { register, logIn, logOut, refreshUser } from "./operationsUser.auth"; // Importowane operacje asynchroniczne

// const initialState = {
//   user: null,
//   token: null,
//   isLoggedIn: false,
//   error: null,  // Dodano pole do przechowywania błędu
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => {
//         state.error = null;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isLoggedIn = true;
//       })
      // .addCase(register.rejected, (state, action) => {
      //   state.error = action.payload; // Ustawienie błędu w stanie
      // })
//       .addCase(logIn.pending, (state) => {
//         state.error = null;
//       })
//       .addCase(logIn.fulfilled, (state, action) => {
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.isLoggedIn = true;
//       })
//       .addCase(logIn.rejected, (state, action) => {
//         state.error = action.payload;
//       })
//       .addCase(logOut.pending, (state) => {
//         state.error = null;
//       })
//       .addCase(logOut.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;
//         state.isLoggedIn = false;
//       })
//       .addCase(logOut.rejected, (state, action) => {
//         state.error = action.payload;
//       })
//       .addCase(refreshUser.pending, (state) => {
//         state.error = null;
//       })
//       .addCase(refreshUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isLoggedIn = true;
//       })
//       .addCase(refreshUser.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export const authReducer = authSlice.reducer;
