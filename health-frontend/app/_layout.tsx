import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="(auth)"
            >
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="(admin)" />
                <Stack.Screen name="(doctor)" />
                <Stack.Screen
                    name="patientBio"
                    options={{ title: 'Patient Bio' }}
                />
            </Stack>
        </GestureHandlerRootView>
    );
}
