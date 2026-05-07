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
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
    Button,
    Input,
    ProfileMenu,
    Screen,
} from '../../components/ui';
import { useAuth } from '../../lib/auth';
import { apiPatch, ApiError } from '../../lib/api';
import { colors } from '../../theme';

export default function AdminProfile() {
    const { user, refreshUser, signOut } = useAuth();
    const router = useRouter();
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [saving, setSaving] = useState(false);

    const onSave = async () => {
        setSaving(true);
        try {
            await apiPatch('/profile', { name, phone });
            await refreshUser();
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            ).catch(() => {});
            Alert.alert('Saved', 'Profile updated');
        } catch (e) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            ).catch(() => {});
            Alert.alert(
                'Failed',
                e instanceof ApiError ? e.message : 'Could not save'
            );
        } finally {
            setSaving(false);
        }
    };

    const onSignOut = () => {
        Alert.alert('Sign out?', 'You will need to sign in again.', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Sign out',
                style: 'destructive',
                onPress: async () => {
                    await signOut();
                    router.replace('/(auth)/login');
                },
            },
        ]);
    };

    return (
        <Screen>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Hero */}
                    <View style={styles.hero}>
                        <Text style={styles.eyebrow}>YOUR ACCOUNT</Text>
                        <Text style={styles.title}>
                            <Text style={styles.titleLead}>Hi, </Text>
                            <Text style={styles.titleAccent}>
                                {user?.name?.split(' ')[0] ?? 'there'}.
                            </Text>
                        </Text>
                        <Text style={styles.role}>
                            Program admin · {user?.email}
                        </Text>
                    </View>

                    {/* Settings menu */}
                    <Text style={styles.sectionTitle}>SETTINGS</Text>
                    <View style={styles.menuWrap}>
                        <ProfileMenu
                            items={[
                                {
                                    icon: 'shield',
                                    label: 'Security & login',
                                    hint: 'Password, biometrics',
                                    onPress: () =>
                                        Alert.alert(
                                            'Coming soon',
                                            'Security settings will be added shortly.'
                                        ),
                                },
                                {
                                    icon: 'inbox',
                                    label: 'Notifications',
                                    hint: 'Push, email, alerts',
                                    onPress: () =>
                                        Alert.alert(
                                            'Coming soon',
                                            'Notification preferences will be added shortly.'
                                        ),
                                },
                                {
                                    icon: 'list',
                                    label: 'Help & support',
                                    hint: 'Get in touch with the team',
                                    onPress: () =>
                                        Alert.alert(
                                            'Help & support',
                                            'Contact: support@projectab.example'
                                        ),
                                },
                            ]}
                        />
                    </View>

                    {/* Edit account */}
                    <Text style={styles.sectionTitle}>EDIT ACCOUNT</Text>
                    <View style={styles.form}>
                        <Input
                            label="Full name"
                            value={name}
                            onChangeText={setName}
                        />
                        <Input
                            label="Phone"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            placeholder="Optional"
                        />
                    </View>
                    <Button
                        label="Save changes"
                        onPress={onSave}
                        loading={saving}
                    />

                    {/* Sign out */}
                    <View style={styles.dangerZone}>
                        <View style={styles.dangerRule} />
                        <Pressable onPress={onSignOut} hitSlop={10}>
                            {({ pressed }) => (
                                <Text
                                    style={[
                                        styles.dangerLabel,
                                        pressed && { opacity: 0.55 },
                                    ]}
                                >
                                    Sign out →
                                </Text>
                            )}
                        </Pressable>
                        <Text style={styles.dangerHint}>
                            You'll need your email and password to sign back in.
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 140,
    },
    hero: { marginBottom: 32 },
    eyebrow: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 2.4,
        color: colors.primary,
        marginBottom: 12,
    },
    title: {
        fontSize: 36,
        lineHeight: 40,
        letterSpacing: -0.5,
        color: colors.text,
    },
    titleLead: { fontWeight: '400' },
    titleAccent: { fontWeight: '700' },
    role: {
        marginTop: 10,
        fontSize: 13,
        color: colors.textMuted,
    },
    menuWrap: { marginBottom: 28 },
    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.8,
        color: colors.textMuted,
        marginBottom: 12,
    },
    form: { marginBottom: 8 },
    dangerZone: {
        marginTop: 36,
    },
    dangerRule: {
        height: 1,
        backgroundColor: colors.divider,
        marginBottom: 18,
    },
    dangerLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.danger,
        letterSpacing: 0.2,
    },
    dangerHint: {
        marginTop: 8,
        fontSize: 13,
        color: colors.textMuted,
    },
});
