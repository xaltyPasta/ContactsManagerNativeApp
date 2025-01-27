import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setContacts } from '../store/contactsSlice';
import { FAB } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../App';
import { Contact, RootState } from '../types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ContactListProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ContactList'>;
};

export const ContactList: React.FC<ContactListProps> = ({ navigation }) => {
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async (): Promise<void> => {
    try {
      const storedContacts = await AsyncStorage.getItem('contacts');
      if (storedContacts) {
        dispatch(setContacts(JSON.parse(storedContacts)));
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const renderItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigation.navigate('ContactDetail', { contact: item })}
    >
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.phone}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <FAB
        style={styles.fab}
        icon={() => <MaterialIcons name="add-circle-outline" size={25} color="black" />}
        onPress={() => navigation.navigate({ name: 'AddEditContact', params: { contact: undefined } })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phone: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ContactList;