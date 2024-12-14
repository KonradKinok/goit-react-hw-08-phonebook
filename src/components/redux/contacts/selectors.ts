import { createSelector } from '@reduxjs/toolkit';
import { Contact,RootState } from '../../Interface/Interface';
import Fuse from "fuse.js";

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const selectIsLoading = (state: RootState) => state.contacts.isLoading;
export const selectError = (state: RootState) => state.contacts.error;
export const selectStatusFilter = (state: RootState) => state.filters.status;

// export const selectVisibleContacts = createSelector(
//   [selectContacts, selectStatusFilter],
//   (contacts, statusFilter) => {
//   const filteredContacts = contacts.filter((contact:Contact) =>
//       contact.name.toLowerCase().includes(statusFilter.toLowerCase()),
//   );
//         return filteredContacts;
//     }
// );
export const fuseOptionsContacts = {
	minMatchCharLength: 1,
	threshold: 0.1,
	keys: [
	"name",
    "number",
	]
};
// export const selectVisibleContacts = createSelector(
//   [selectContacts, selectStatusFilter],
//   (contacts, statusFilter) => {
//   if (!statusFilter || statusFilter.trim() === "") {
//       return contacts; // Zwracaj oryginalną tablicę kontaktów
//     }
//       const fuse = new Fuse(contacts, fuseOptionsContacts);
//       const searchPattern = statusFilter;
      
//       return fuse.search(searchPattern).map((result) => result.item);
//   }
// );

export const selectVisibleContacts = createSelector(
  [selectContacts, selectStatusFilter],
  (contacts: Contact[], statusFilter: string): Contact[] => {
  if (!statusFilter || statusFilter.trim() === "") {
      return contacts; // Zwracaj oryginalną tablicę kontaktów
    }
      const fuse = new Fuse(contacts, fuseOptionsContacts);
      const searchPattern = statusFilter;
      
      return fuse.search(searchPattern).map((result) => result.item);
  }
);