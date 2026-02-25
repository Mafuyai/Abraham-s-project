import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';

export default function UpdateProfile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch user profile data from the backend
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8000/profile'); // Replace with your backend endpoint
                const data = await response.json();
                if (data.success) {
                    setName(data.user.name || '');
                    setEmail(data.user.email || '');
                    setAge(data.user.age || '');
                    setGender(data.user.gender || '');
                } else {
                    Alert.alert('Error', 'Failed to fetch profile data');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                Alert.alert('Error', 'Could not fetch profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdate = async () => {
        try {
            const response = await fetch(
                'http://localhost:8000/profile/update',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name,
                        email,
                        gender,
                        age,
                    }),
                }
            );

            const data = await response.json();

            console.log(data); // Log it to inspect what you're getting from the server

            if (data.success) {
                Alert.alert(
                    'Profile Updated',
                    'Your profile has been successfully updated.'
                );
                router.push('/(tabs)/profile');
            } else {
                Alert.alert(
                    'Error',
                    data.message || 'Failed to update profile'
                );
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Could not update profile');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0D3EED" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Profile</Text>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Age"
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />

            <TextInput
                style={styles.input}
                placeholder="Gender"
                value={gender}
                onChangeText={setGender}
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 90,
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#0D3EED',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
