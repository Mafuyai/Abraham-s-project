import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import CustomButton from '../../../components/CustomButton';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function PatientRegister() {
    const BASE_URL = 'http://192.168.1.152:8000';
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            role: 'user', // Added role here
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
                    name: email.split('@')[0],
                    role: 'user', // Added role to request
                }),
            });

            const data = await response.json();
            console.log('Response status:', response.status);
            console.log('Response data:', data);

            if (response.status === 400) {
                Alert.alert('Error', data.message || 'Sign up failed');
                return;
            }

            if (data.success) {
                Alert.alert(
                    'Success',
                    'Please check your email for the verification code.',
                    [
                        {
                            text: 'Ok',
                            onPress: () =>
                                router.push({
                                    pathname: '/(auth)/verifyotp',
                                    params: { email },
                                }),
                        },
                    ]
                );
            } else {
                // Handle email already registered scenario
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
                                    } as any),
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
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Back Button */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Patient Registration</Text>
                    <Text style={styles.subtitle}>
                        Create your patient account
                    </Text>

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
                            <Text style={styles.label}>
                                Clinic/Hospital Name
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter clinic/hospital name"
                                keyboardType="email-address"
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
                        <Link href="/(auth)/login/login_patients" asChild>
                            <TouchableOpacity>
                                <Text style={styles.loginLink}>Login</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    backButton: {
        padding: 16,
        paddingTop: 20,
    },
    content: {
        padding: 16,
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
        gap: 24,
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
});
