import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    Alert,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function VerifyOTP() {
    // const router = useRouter();
    // const [otp, setOtp] = useState('');

    // const handleVerifyOTP = async () => {
    //     if (otp.length !== 6) {
    //         Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
    //         return;
    //     }

    //     try {
    //         const response = await fetch('http://192.168.105.237:8000/auth/verify-otp', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ otp }),
    //         });

    //         const data = await response.json();

    //         if (data.success) {
    //             Alert.alert('Success', 'OTP verified successfully!', [
    //                 {
    //                     text: 'OK',
    //                     onPress: () => router.push('/(auth)/login'),
    //                 },
    //             ]);
    //         } else {
    //             Alert.alert('Error', data.message || 'Failed to verify OTP.');
    //         }
    //     } catch (error) {
    //         console.error('Error verifying OTP:', error);
    //         Alert.alert('Error', 'Something went wrong. Please try again.');
    //     }
    // };

    const router = useRouter();
    const { email } = useLocalSearchParams();
    const [otp, setOtp] = useState('');

    const handleVerifyOTP = async () => {
        if (!otp) {
            Alert.alert('Error', 'Please enter the OTP');
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8000/auth/verify-otp`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        otp: otp.trim(),
                    }),
                }
            );

            const data = await response.json();
            console.log('Verification response:', data);

            if (data.success) {
                Alert.alert(
                    'Success',
                    'Email verified successfully. You can now login.',
                    [
                        {
                            text: 'OK',
                            onPress: () => router.push('/(auth)/login'),
                        },
                    ]
                );
            } else {
                Alert.alert('Error', data.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error('Error details:', error);
            Alert.alert('Error', 'Could not connect to server');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.backButton} onPress={() => router.back()}>
                    ←
                </Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.title}>Verify Your Email</Text>
                <Text style={styles.subtitle}>
                    Please enter the 6-digit verification code sent to your
                    email.
                </Text>

                {/* OTP Input */}
                <TextInput
                    style={styles.otpInput}
                    placeholder="Enter OTP"
                    keyboardType="numeric"
                    maxLength={6}
                    value={otp}
                    onChangeText={setOtp}
                />

                {/* Verify Button */}
                <TouchableOpacity
                    style={styles.verifyButton}
                    onPress={handleVerifyOTP}
                >
                    <Text style={styles.verifyButtonText}>Verify OTP</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    backButton: {
        fontSize: 24,
        color: '#666',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
        textAlign: 'center',
    },
    otpInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        padding: 12,
        fontSize: 18,
        textAlign: 'center',
        width: '80%',
        marginBottom: 24,
    },
    verifyButton: {
        backgroundColor: '#0D3EED',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        width: '80%',
    },
    verifyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
