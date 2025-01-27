import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;