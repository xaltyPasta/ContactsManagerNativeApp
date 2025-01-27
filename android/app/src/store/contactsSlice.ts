import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Contact, ContactsState } from '../types';

const initialState: ContactsState = {
    contacts: [],
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setContacts: (state, action: PayloadAction<Contact[]>) => {
            state.contacts = action.payload;
        },
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload);
            AsyncStorage.setItem('contacts', JSON.stringify(state.contacts));
        },
        updateContact: (state, action: PayloadAction<Contact>) => {
            const index = state.contacts.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = action.payload;
                AsyncStorage.setItem('contacts', JSON.stringify(state.contacts));
            }
        },
        deleteContact: (state, action: PayloadAction<string>) => {
            state.contacts = state.contacts.filter(c => c.id !== action.payload);
            AsyncStorage.setItem('contacts', JSON.stringify(state.contacts));
        },
    },
});

export const { setContacts, addContact, updateContact, deleteContact } = contactsSlice.actions;
export default contactsSlice.reducer;