import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function ReceptionistRegister() {
    const BASE_URL = 'http://192.168.1.152:8000';
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = async () => {
        console.log('Starting signup...');
        console.log('Request body:', {
            email,
            password,
            name: email.split('@')[0],
            role: 'admin',
        });

        if (!validateEmail(email)) {
            Alert.alert('Invalid email address');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    name,
                    role: 'admin',
                }),
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (data.success) {
                Alert.alert(
                    'Success',
                    'Please check your email for the verification code.',
                    [
                        {
                            text: 'OK',
                            onPress: () =>
                                router.push({
                                    pathname: '/(auth)/verifyotp',
                                    params: { email },
                                }),
                        },
                    ]
                );
            } else {
                if (data.message === 'Email already registered') {
                    Alert.alert(
                        'Email Already Registered',
                        'Would you like to resend the verification code?',
                        [
                            {
                                text: 'No',
                                style: 'cancel',
                            },
                            {
                                text: 'Yes',
                                onPress: () =>
                                    router.push({
                                        pathname: '/(auth)/resendotp',
                                        params: { email },
                                    } as any), // Added 'as any' to bypass type error
                            },
                        ]
                    );
                } else {
                    Alert.alert('Error', data.message || 'Sign up failed');
                }
            }
        } catch (error) {
            console.error('Signup error:', error);
            Alert.alert(
                'Connection Error',
                'Could not connect to server. Please check your internet connection.'
            );
        }
        console.log(email, password, name);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Admin Registration</Text>
                <Text style={styles.subtitle}>Create your admin account</Text>

                {/* Form */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email} // Bind the state to the input
                            onChangeText={setEmail} // Update the state on input change
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Clinic/Hospital Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter clinic/hospital name"
                            keyboardType="email-address"
                            value={name}
                            onChangeText={setName} // Update the state on input change
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Create a password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>
                </View>

                {/* Register Button */}
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={handleSignUp}
                >
                    <Text style={styles.registerButtonText}>
                        Create Account
                    </Text>
                </TouchableOpacity>

                {/* Login Link */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Already have an account?{' '}
                    </Text>
                    <Link href="/(auth)/login/login_admin" asChild>
                        <TouchableOpacity>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        padding: 16,
        paddingTop: 60,
    },
    backButton: {
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
    },
    form: {
        gap: 20,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: '#0D3EED',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 32,
    },
    registerButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    footerText: {
        color: '#666',
    },
    loginLink: {
        color: '#0D3EED',
        fontWeight: '600',
    },
});
