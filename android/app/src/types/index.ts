export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    address: string;
}

export interface ContactsState {
    contacts: Contact[];
}

export interface RootState {
    contacts: ContactsState;
}