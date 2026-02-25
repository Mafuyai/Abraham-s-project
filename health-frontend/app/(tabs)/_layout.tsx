import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
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
                name="clinic"
                options={{
                    title: 'Clinic',
                    tabBarLabel: 'Clinic',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="medical-outline"
                            size={24}
                            color={focused ? '#0066ff' : '#999'}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="record"
                options={{
                    title: 'Record',
                    tabBarLabel: 'Record',
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="document-text-outline"
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
