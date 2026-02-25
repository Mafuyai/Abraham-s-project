import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AdminTabLayout() {
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
                name="bio"
                options={{
                    title: 'Bio',
                    tabBarLabel: 'Bio',
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
