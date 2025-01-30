import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './android/app/src/store';
import ContactList from './android/app/src/screens/ContactList';
import ContactDetail from './android/app/src/screens/ContactDetail';
import AddEditContact from './android/app/src/screens/AddEditContact';
import { Contact } from './android/app/src/types';

export type RootStackParamList = {
  ContactList: undefined;
  ContactDetail: { contact: Contact };
  AddEditContact: { contact?: Contact };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}></PersistGate> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ContactList"
            component={ContactList}
            options={{ title: 'Contacts' }}
          />
          <Stack.Screen
            name="ContactDetail"
            component={ContactDetail}
            options={{ title: 'Contact Details' }}
          />
          <Stack.Screen
            name="AddEditContact"
            component={AddEditContact}
            options={({ route }) => ({
              title: route.params?.contact ? 'Edit Contact' : 'Add Contact',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
