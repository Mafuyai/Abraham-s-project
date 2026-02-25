import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function DoctorTabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#0066ff',
                tabBarInactiveTintColor: '#999',
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: '#f0f0f0',
                    backgroundColor: 'white',
                    height: 60,
                    paddingBottom: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="home-outline"
                            size={24}
                            color={focused ? '#0066ff' : '#999'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="patients"
                options={{
                    title: 'patient',
                    tabBarLabel: 'Patient',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="people-outline"
                            size={24}
                            color={focused ? '#0066ff' : '#999'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="appointment"
                options={{
                    title: 'Appointment',
                    tabBarLabel: 'Appointment',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="card-outline"
                            size={24}
                            color={focused ? '#0066ff' : '#999'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="nfc"
                options={{
                    title: 'NFC',
                    tabBarLabel: 'NFC',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="card-outline"
                            size={24}
                            color={focused ? '#0066ff' : '#999'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="person-outline"
                            size={24}
                            color={focused ? '#0066ff' : '#999'}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
