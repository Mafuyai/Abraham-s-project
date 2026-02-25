import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import { Text } from 'react-native';
import PatientBio from './PatientBio';

// Import the nfc_display component

// Define and export the stack navigator's parameter list
export type RootStackParamList = {
    patientBio: { patientId?: string };
};

// Create the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

const NFCLinking = () => {
    // Deep linking configuration
    Linking.createURL('medtrack://');
    const linking = {
        prefixes: ['medtrack://'],
        config: {
            screens: {
                patientBio: {
                    path: 'patientBio/:patientId',
                    parse: {
                        patientId: (id: string) => id,
                    },
                },
            },
        },
    };

    return (
        <NavigationContainer
            linking={linking}
            fallback={<Text>Loading...</Text>}
        >
            <Stack.Navigator
                initialRouteName="patientBio"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="patientBio" component={PatientBio} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NFCLinking;
