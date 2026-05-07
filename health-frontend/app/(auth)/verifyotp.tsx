import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    View,
    Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    AppBar,
    Button,
    Input,
    Screen,
    Text,
} from '../../components/ui';
import { apiPost, ApiError } from '../../lib/api';
import { space } from '../../theme';

export default function VerifyOTP() {
    const router = useRouter();
    const { email } = useLocalSearchParams<{ email: string }>();
    const [otp, setOtp] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [resending, setResending] = useState(false);

    const onVerify = async () => {
        if (otp.trim().length !== 6) {
            Alert.alert('Invalid code', 'Enter the 6-digit code from your email');
            return;
        }
        setSubmitting(true);
        try {
            await apiPost('/auth/verify-otp', { email, otp: otp.trim() });
            Alert.alert('Verified', 'You can now sign in.', [
                { text: 'OK', onPress: () => router.replace('/(auth)/login') },
            ]);
        } catch (e) {
            Alert.alert(
                'Verification failed',
                e instanceof ApiError ? e.message : 'Try again'
            );
        } finally {
            setSubmitting(false);
        }
    };

    const onResend = async () => {
        setResending(true);
        try {
            await apiPost('/auth/resend-otp', { email });
            Alert.alert('Sent', 'A new code has been emailed to you');
        } catch (e) {
            Alert.alert(
                'Could not resend',
                e instanceof ApiError ? e.message : 'Try again'
            );
        } finally {
            setResending(false);
        }
    };

    return (
        <Screen>
            <AppBar showBack />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.head}>
                        <Text variant="display">Verify your email</Text>
                        <Text
                            variant="body"
                            tone="muted"
                            style={{ marginTop: 6 }}
                        >
                            We sent a 6-digit code to{'\n'}
                            <Text variant="bodyStrong">{email}</Text>
                        </Text>
                    </View>

                    <View style={{ marginTop: space.xl }}>
                        <Input
                            label="Verification code"
                            value={otp}
                            onChangeText={setOtp}
                            keyboardType="number-pad"
                            maxLength={6}
                            style={{
                                textAlign: 'center',
                                fontSize: 24,
                                letterSpacing: 8,
                                fontWeight: '600',
                            }}
                            placeholder="000000"
                        />
                    </View>

                    <Button
                        label="Verify"
                        onPress={onVerify}
                        loading={submitting}
                    />
                    <Button
                        label="Resend code"
                        onPress={onResend}
                        loading={resending}
                        variant="ghost"
                        style={{ marginTop: space.sm }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: space.lg,
        paddingBottom: space.xl,
    },
    head: { marginTop: space.md },
});
