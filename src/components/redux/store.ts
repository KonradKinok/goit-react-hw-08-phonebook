import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { contactsReducer } from "./contacts/contactsSlice";
import { authReducer } from "./authUser/sliceUser.auth"; 
import { filtersReducer } from "./contacts/filtersSlice";
import { languageReducer } from "./language/sliceLanguage";
import { AuthState } from "../Interface/Interface";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer<AuthState>(
  authPersistConfig,
  authReducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    contacts: contactsReducer,
    filters: filtersReducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
export const persistor = persistStore(store);
