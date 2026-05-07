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
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { AppBar, Button, Input, Screen } from '../../components/ui';
import { useAuth } from '../../lib/auth';
import { ApiError } from '../../lib/api';
import { Role } from '../../lib/types';
import { colors } from '../../theme';

const ROLE_META: Record<Role, { eyebrow: string; lead: string; accent: string }> = {
    officer: {
        eyebrow: '01   FIELD OFFICER',
        lead: 'Set up your',
        accent: 'field account.',
    },
    admin: {
        eyebrow: '02   PROGRAM ADMIN',
        lead: 'Set up your',
        accent: 'admin account.',
    },
};

export default function Register() {
    const router = useRouter();
    const { role } = useLocalSearchParams<{ role?: Role }>();
    const accountRole: Role = role === 'admin' ? 'admin' : 'officer';
    const meta = ROLE_META[accountRole];
    const { signUp } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [region, setRegion] = useState('');
    const [staffId, setStaffId] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        if (!name.trim()) return 'Name is required';
        if (!email.includes('@')) return 'Valid email is required';
        if (password.length < 6) return 'Password must be at least 6 characters';
        return null;
    };

    const onSubmit = async () => {
        const err = validate();
        if (err) {
            Alert.alert('Check details', err);
            return;
        }
        setSubmitting(true);
        try {
            await signUp({
                email: email.trim().toLowerCase(),
                password,
                name: name.trim(),
                role: accountRole,
                phone: phone.trim() || undefined,
                region: region.trim() || undefined,
                staffId: staffId.trim() || undefined,
            });
            router.push({
                pathname: '/(auth)/verifyotp',
                params: { email: email.trim().toLowerCase() },
            });
        } catch (e) {
            const msg = e instanceof ApiError ? e.message : 'Sign up failed';
            Alert.alert('Sign up failed', msg);
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
                        <Text style={styles.eyebrow}>{meta.eyebrow}</Text>
                        <Text style={styles.title}>
                            <Text style={styles.titleLead}>{meta.lead} </Text>
                            <Text style={styles.titleAccent}>{meta.accent}</Text>
                        </Text>
                        <Text style={styles.lede}>
                            A 6-digit verification code will be emailed to you.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Full name"
                            value={name}
                            onChangeText={setName}
                            placeholder="Jane Doe"
                        />
                        <Input
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholder="you@example.com"
                        />
                        <Input
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholder="At least 6 characters"
                        />
                        <Input
                            label="Phone"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            placeholder="Optional"
                        />
                        {accountRole === 'officer' ? (
                            <>
                                <Input
                                    label="Region"
                                    value={region}
                                    onChangeText={setRegion}
                                    placeholder="Optional"
                                />
                                <Input
                                    label="Staff ID"
                                    value={staffId}
                                    onChangeText={setStaffId}
                                    autoCapitalize="characters"
                                    placeholder="Optional"
                                />
                            </>
                        ) : null}
                    </View>

                    <Button
                        label="Create account"
                        onPress={onSubmit}
                        loading={submitting}
                        style={{ marginTop: 8 }}
                    />

                    <View style={styles.footer}>
                        <Link href="/(auth)/login" asChild>
                            <Pressable hitSlop={10}>
                                {({ pressed }) => (
                                    <Text
                                        style={[
                                            styles.footerText,
                                            pressed && { opacity: 0.5 },
                                        ]}
                                    >
                                        Already with us?{' '}
                                        <Text style={styles.footerLink}>
                                            Sign in
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
    hero: { marginTop: 8, marginBottom: 28 },
    eyebrow: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 2.4,
        color: colors.primary,
        marginBottom: 16,
    },
    title: {
        fontSize: 36,
        lineHeight: 40,
        letterSpacing: -0.5,
        color: colors.text,
        marginBottom: 12,
    },
    titleLead: { fontWeight: '400' },
    titleAccent: { fontWeight: '700' },
    lede: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.textMuted,
    },
    form: { marginBottom: 8 },
    footer: {
        marginTop: 32,
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
