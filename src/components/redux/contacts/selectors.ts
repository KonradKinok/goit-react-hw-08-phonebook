import { createSelector } from '@reduxjs/toolkit';
import { Contact,RootState } from '../../Interface/Interface';

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectIsLoading = (state: RootState) => state.contacts.isLoading;
export const selectError = (state: RootState) => state.contacts.error;
export const selectStatusFilter = (state: RootState) => state.filters.status;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectStatusFilter],
  (contacts, statusFilter) => {
  const filteredContacts = contacts.filter((contact:Contact) =>
      contact.name.toLowerCase().includes(statusFilter.toLowerCase()),
  );
        return filteredContacts;
    }
);
