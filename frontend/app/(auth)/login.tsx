import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { AppBar, Button, Input, Screen } from '../../components/ui';
import { useAuth } from '../../lib/auth';
import { ApiError } from '../../lib/api';
import { colors } from '../../theme';

export default function Login() {
    const router = useRouter();
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async () => {
        if (!email.includes('@')) {
            Alert.alert('Check email', 'Please enter a valid email');
            return;
        }
        if (!password) {
            Alert.alert('Check password', 'Password is required');
            return;
        }

        setSubmitting(true);
        try {
            const user = await signIn(email.trim().toLowerCase(), password);
            router.replace(user.role === 'admin' ? '/(admin)' : '/(officer)');
        } catch (e) {
            if (e instanceof ApiError && e.status === 403) {
                Alert.alert('Verify your account', e.message, [
                    {
                        text: 'Verify',
                        onPress: () =>
                            router.push({
                                pathname: '/(auth)/verifyotp',
                                params: { email: email.trim().toLowerCase() },
                            }),
                    },
                    { text: 'Cancel', style: 'cancel' },
                ]);
            } else {
                Alert.alert(
                    'Sign in failed',
                    e instanceof ApiError ? e.message : 'Connection error'
                );
            }
        } finally {
            setSubmitting(false);
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
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.hero}>
                        <Text style={styles.eyebrow}>WELCOME BACK</Text>
                        <Text style={styles.title}>
                            <Text style={styles.titleLead}>Sign in to </Text>
                            <Text style={styles.titleAccent}>your account.</Text>
                        </Text>
                        <Text style={styles.lede}>
                            Pick up where you left off.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                        <Input
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholder="••••••••"
                        />
                    </View>

                    <Button
                        label="Sign in"
                        onPress={onSubmit}
                        loading={submitting}
                        style={{ marginTop: 8 }}
                    />

                    <View style={styles.footer}>
                        <Link href="/(auth)" asChild>
                            <Pressable hitSlop={10}>
                                {({ pressed }) => (
                                    <Text
                                        style={[
                                            styles.footerText,
                                            pressed && { opacity: 0.5 },
                                        ]}
                                    >
                                        First time here?{' '}
                                        <Text style={styles.footerLink}>
                                            Create account
                                        </Text>
                                    </Text>
                                )}
                            </Pressable>
                        </Link>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 28,
        paddingBottom: 32,
        flexGrow: 1,
    },
    hero: { marginTop: 8, marginBottom: 36 },
    eyebrow: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 2.4,
        color: colors.primary,
        marginBottom: 16,
    },
    title: {
        fontSize: 38,
        lineHeight: 42,
        letterSpacing: -0.5,
        color: colors.text,
        marginBottom: 12,
    },
    titleLead: { fontWeight: '400' },
    titleAccent: { fontWeight: '700' },
    lede: {
        fontSize: 15,
        lineHeight: 22,
        color: colors.textMuted,
    },
    form: { marginBottom: 8 },
    footer: {
        marginTop: 'auto',
        paddingTop: 32,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: colors.textMuted,
    },
    footerLink: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '600',
    },
});
