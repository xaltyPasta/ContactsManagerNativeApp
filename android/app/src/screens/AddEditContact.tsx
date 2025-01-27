import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { TextInput, Button } from 'react-native-paper';
import { addContact, updateContact } from '../store/contactsSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App';
import { Contact } from '../types';

type AddEditContactProps = {
    route: RouteProp<RootStackParamList, 'AddEditContact'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'AddEditContact'>;
};

export const AddEditContact: React.FC<AddEditContactProps> = ({ route, navigation }) => {
    const contact = route.params?.contact;
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<Contact>({
        id: contact?.id || Date.now().toString(),
        name: contact?.name || '',
        phone: contact?.phone || '',
        email: contact?.email || '',
        address: contact?.address || '',
    });

    const handleSubmit = () => {
        if (!formData.name || !formData.phone) {
            alert('Name and phone number are required!');
            return;
        }

        if (contact) {
            dispatch(updateContact(formData));
        } else {
            dispatch(addContact(formData));
        }
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                label="Name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                style={styles.input}
            />
            <TextInput
                label="Phone"
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                keyboardType="phone-pad"
                style={styles.input}
            />
            <TextInput
                label="Email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                style={styles.input}
            />
            <TextInput
                label="Address"
                value={formData.address}
                onChangeText={(text) => setFormData({ ...formData, address: text })}
                multiline
                style={styles.input}
            />
            <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                {contact ? 'Update Contact' : 'Add Contact'}
            </Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        marginBottom: 12,
    },
    button: {
        marginTop: 16,
    },
});

function alert(arg0: string) {
    throw new Error('Function not implemented.');
}


export default AddEditContact;