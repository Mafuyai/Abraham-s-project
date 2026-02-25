import { View, Text, TextInput, SafeAreaView, Alert } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
// import { API_URL } from '@env';

export default function ResendOTP() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResendOTP = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `http://10.10.8.8:8000/auth/resend-otp`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email.trim() }),
                }
            );

            const data = await response.json();
            if (data.success) {
                Alert.alert(
                    'Success',
                    'New verification code sent to your email',
                    [
                        {
                            text: 'OK',
                            onPress: () =>
                                router.push({
                                    pathname: '/(auth)/verifyotp',
                                    params: { email: email.trim() },
                                }),
                        },
                    ]
                );
            } else {
                Alert.alert('Error', data.message || 'Could not resend code');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Could not connect to server');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView className="bg-white flex-1">
                <View className="flex-row items-center p-4 border-b border-gray-100">
                    <Text
                        className="text-gray-400 text-2xl mb-5"
                        onPress={() => router.back()}
                    >
                        ←
                    </Text>
                </View>

                <View className="p-4">
                    <Text className="text-2xl font-bold mb-2">
                        Resend Verification Code
                    </Text>
                    <Text className="text-gray-500 mb-6">
                        Enter your email to receive a new verification code
                    </Text>

                    <TextInput
                        className="bg-gray-100 p-4 rounded-xl text-black mb-4"
                        placeholder="Enter Email address"
                        placeholderTextColor="rgba(0, 0, 0, 0.4)"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <CustomButton
                        text="Create Account"
                        onPress={handleResendOTP}
                        size="large"
                        style={{ marginTop: 32 }}
                        variant="primary"
                    />
                </View>
            </SafeAreaView>
        </>
    );
}
