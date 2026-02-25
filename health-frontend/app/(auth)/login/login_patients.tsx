import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../../components/CustomButton';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function Login() {
    const BASE_URL = 'http://localhost:8000';
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginScreen, setIsLoginScreen] = useState(true);

    const validateEmail = (email: string) => {
        return email.includes('@') && email.includes('.com');
    };

    const handleSignIn = async () => {
        console.log('Attempting signin with:', email, password);

        if (!validateEmail(email)) {
            Alert.alert('Invalid email address');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Full response data:', data);

            if (data.success) {
                Alert.alert('Success', 'Welcome back!', [
                    {
                        text: 'OK',
                        onPress: () => router.replace('/(tabs)/profile'),
                    },
                ]);

                if (email.toLowerCase().includes('admin')) {
                    router.replace('/(admin)');
                } else {
                    router.replace('/(tabs)/profile');
                }
            } else {
                Alert.alert('Error', data.message || 'Sign in failed');
            }
        } catch (error) {
            console.error('Signin error:', error);
            Alert.alert(
                'Connection Error',
                'Could not connect to server. Please check your internet connection.'
            );
        }
    };

    const handleLogout = () => {
        // Handle logout here (clear tokens, etc.)
        // After logging out, navigate to the login screen
        router.replace('/(auth)/login');
    };

    const handleGoBack = () => {
        if (isLoginScreen) {
            // If we're on the login screen, go to the register page
            router.replace('/(auth)/register/patient');
        } else {
            // Otherwise, go back in history
            router.back();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Back Button */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleGoBack}
                >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>

                {/* Header */}
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Login to your account</Text>

                {/* Form */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    {/* Forgot Password */}
                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Login Button */}
                <CustomButton
                    text="Login"
                    onPress={handleSignIn}
                    size="large"
                    style={{ marginTop: 32 }}
                />

                {/* Register Link */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Don't have an account?{' '}
                    </Text>
                    <Link href="/(auth)" asChild>
                        <TouchableOpacity>
                            <Text style={styles.registerLink}>Register</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        padding: 16,
        paddingTop: 60,
    },
    backButton: {
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 48,
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
    forgotPassword: {
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        color: '#0D3EED',
        fontSize: 14,
        fontWeight: '500',
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
    registerLink: {
        color: '#0D3EED',
        fontWeight: '600',
    },
});
