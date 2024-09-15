import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  client,
  setAuthHeader,
  clearAuthHeader,
} from "../../libUser/clientUser";
import { AuthCredentials, AuthResponse } from "../../Interface/Interface";

/*
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk<AuthResponse, AuthCredentials >(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await client.post<AuthResponse>("/users/signup", credentials);
      // After successful registration, add the token to the HTTP header
      setAuthHeader(res.data.token);
      console.log("operationUser.auth -> register -> res.data", res.data.token);
      return res.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk<AuthResponse, AuthCredentials>(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await client.post<AuthResponse>("/users/login", credentials);
      // After successful login, add the token to the HTTP header
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk<void, void>("auth/logout", async (_, thunkAPI) => {
  try {
    await client.post("/users/logout");
    // After a successful logout, remove the token from the HTTP header
    clearAuthHeader();
  } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/current
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk<AuthResponse['user'], void, { state: { auth: { token: string | null } }}>(
  "auth/refresh",
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      // return thunkAPI.rejectWithValue({ message: "Unable to fetch user" });
      const message:any="Unable to fetch user"
      return thunkAPI.rejectWithValue(message);
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setAuthHeader(persistedToken);
      const res = await client.get<AuthResponse['user']>("/users/current");
      console.log(
        "operationsUser.auth.js -> refreshUser -> res.data",
        res.data,
      );
      return res.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
