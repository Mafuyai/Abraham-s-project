import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NFCManagement from '../app/(admin)/nfc'; // Adjust path as needed
import PatientBio from '../components/PatientBio'; // Adjust path as needed
import { RootStackParamList } from '../components/types'; // Adjust path as needed
const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="NFCManagement">
                <Stack.Screen
                    name="NFCManagement"
                    component={NFCManagement}
                    options={{ title: 'NFC Card Management' }}
                />
                <Stack.Screen
                    name="PatientBio"
                    component={PatientBio}
                    options={{ title: 'Patient Bio' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
