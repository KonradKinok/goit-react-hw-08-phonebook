import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../libUser/clientUser";
import { Contact, AddContact } from "../../Interface/Interface";

export const fetchContacts = createAsyncThunk<Contact[], void, { rejectValue: string }>(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await client.get("/contacts");
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const addContact = createAsyncThunk<Contact, AddContact, { rejectValue: string }>(
  "contacts/addContact",
  async (contactData, thunkAPI) => {
    try {
      const response = await client.post<Contact>("/contacts",  contactData);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const deleteContact = createAsyncThunk<Contact, string, { rejectValue: string }>(
  "contacts/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await client.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const editContact = createAsyncThunk<Contact, Contact, { rejectValue: string }>(
  "contacts/editContact",
  async (contact: Contact, thunkAPI) => {
    try {
      const response = await client.patch<Contact>(`/contacts/${contact.id}`, {
        name: contact.name,
        number: contact.number,
      });
      console.log(response.data);
      return response.data;  // Zwraca odpowiedni typ Contact
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);  // Zwraca odpowiednią wartość przy błędzie
    }
  },
);