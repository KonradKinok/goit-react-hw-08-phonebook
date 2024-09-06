import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from "./operations";
import { Contact, ContactsState } from "../../Interface/Interface";

const handlePending = (state: ContactsState) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state: ContactsState, action: PayloadAction<string>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const isPendingAction = (action: Action): boolean => {
  return action.type.endsWith("/pending");
};

const isRejectAction = (action: Action): boolean => {
  return action.type.endsWith("/rejected");
};

const initialState: ContactsState = {
  contacts: [],
  isLoading: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.isLoading = false;
        state.error = null;
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id,
        );
        state.contacts.splice(index, 1);
      })
      .addCase(editContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.isLoading = false;
        state.error = null;
        const index = state.contacts.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.contacts[index] = action.payload; // Aktualizacja kontaktu
        }
      })
      .addMatcher(isPendingAction, handlePending)
      .addMatcher(isRejectAction, handleRejected)
      // .addDefaultCase((state) => {
      //   state.error = "someone use old function, fix it!";
      // });
  },
});

export const contactsReducer = contactSlice.reducer;