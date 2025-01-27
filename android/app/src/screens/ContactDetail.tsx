import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text, Button } from 'react-native-paper';
import { deleteContact } from '../store/contactsSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App';

type ContactDetailProps = {
    route: RouteProp<RootStackParamList, 'ContactDetail'>;
    navigation: NativeStackNavigationProp<RootStackParamList, 'ContactDetail'>;
};

export const ContactDetail: React.FC<ContactDetailProps> = ({ route, navigation }) => {
    const { contact } = route.params;
    const dispatch = useDispatch();

    const handleDelete = () => {
        Alert.alert(
            'Delete Contact',
            'Are you sure you want to delete this contact?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: () => {
                        dispatch(deleteContact(contact.id));
                        navigation.goBack();
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{contact.name}</Text>

                <Text style={styles.label}>Phone:</Text>
                <Text style={styles.value}>{contact.phone}</Text>

                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{contact.email}</Text>

                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>{contact.address}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('AddEditContact', { contact })}
                    style={styles.button}
                >
                    Edit
                </Button>
                <Button
                    mode="contained"
                    onPress={handleDelete}
                    style={[styles.button, styles.deleteButton]}
                >
                    Delete
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    infoContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 12,
    },
    value: {
        fontSize: 16,
        marginTop: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        width: '40%',
    },
    deleteButton: {
        backgroundColor: '#ff4444',
    },
});


export default ContactDetail;