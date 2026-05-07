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
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
    AppBar,
    Button,
    Input,
    Screen,
} from '../../components/ui';
import { Scan as ScanIcon } from '../../assets/icons';
import {
    isNfcSupported,
    readTag,
    cancel as cancelNfc,
} from '../../lib/nfc';
import { registerFarmer } from '../../lib/farmers';
import { ApiError } from '../../lib/api';
import { colors, palette, radius } from '../../theme';

export default function RegisterFarmer() {
    const router = useRouter();
    const params = useLocalSearchParams<{ tag?: string }>();

    const [rfidTag, setRfidTag] = useState(params.tag || '');
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [gender, setGender] = useState<'Male' | 'Female' | ''>('');
    const [state, setState] = useState('');
    const [lga, setLga] = useState('');
    const [community, setCommunity] = useState('');
    const [primaryCrop, setPrimaryCrop] = useState('');
    const [farmSize, setFarmSize] = useState('');
    const [cooperative, setCooperative] = useState('');
    const [scanning, setScanning] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const scanForTag = async () => {
        const supported = await isNfcSupported();
        if (!supported) {
            Alert.alert(
                'NFC unavailable',
                Platform.OS === 'web'
                    ? 'NFC is not supported on web'
                    : 'Device does not support NFC'
            );
            return;
        }
        Haptics.selectionAsync().catch(() => {});
        setScanning(true);
        try {
            const uid = await readTag();
            setRfidTag(uid);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            ).catch(() => {});
        } catch (e: any) {
            if (e?.message && !`${e.message}`.toLowerCase().includes('cancel')) {
                Alert.alert('Scan failed', `${e.message}`);
            }
        } finally {
            setScanning(false);
            cancelNfc();
        }
    };

    const validate = () => {
        if (!rfidTag.trim()) return 'RFID tag is required (scan it)';
        if (!fullName.trim()) return 'Full name is required';
        if (!phone.trim()) return 'Phone is required';
        if (!gender) return 'Select a gender';
        if (!state.trim()) return 'State is required';
        if (!lga.trim()) return 'LGA is required';
        return null;
    };

    const onSubmit = async () => {
        const err = validate();
        if (err) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            ).catch(() => {});
            Alert.alert('Check details', err);
            return;
        }
        setSubmitting(true);
        try {
            const { farmer } = await registerFarmer({
                rfidTag,
                fullName,
                phone,
                nationalId: nationalId || undefined,
                gender: gender as 'Male' | 'Female',
                state,
                lga,
                community: community || undefined,
                primaryCrop: primaryCrop || undefined,
                farmSizeHectares: farmSize ? Number(farmSize) : undefined,
                cooperative: cooperative || undefined,
            });
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            ).catch(() => {});
            Alert.alert(
                'Registered',
                `${farmer.fullName} is now in the system.`,
                [
                    {
                        text: 'View profile',
                        onPress: () =>
                            router.replace({
                                pathname: '/(farmer)/[id]',
                                params: { id: farmer._id },
                            }),
                    },
                ]
            );
        } catch (e) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            ).catch(() => {});
            Alert.alert(
                'Registration failed',
                e instanceof ApiError ? e.message : 'Try again'
            );
        } finally {
            setSubmitting(false);
        }
    };

    const GenderPill = ({ value }: { value: 'Male' | 'Female' }) => {
        const active = gender === value;
        return (
            <Pressable
                onPress={() => {
                    Haptics.selectionAsync().catch(() => {});
                    setGender(value);
                }}
                style={[styles.pill, active && styles.pillActive]}
            >
                <Text
                    style={[
                        styles.pillText,
                        active && styles.pillTextActive,
                    ]}
                >
                    {value}
                </Text>
            </Pressable>
        );
    };

    return (
        <Screen>
            <AppBar showBack title="Register farmer" />
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
                        <Text style={styles.eyebrow}>NEW FARMER</Text>
                        <Text style={styles.title}>
                            <Text style={styles.titleLead}>Bind a tag, </Text>
                            <Text style={styles.titleAccent}>
                                add a farmer.
                            </Text>
                        </Text>
                        <Text style={styles.lede}>
                            Scan the card first, then fill in their details.
                        </Text>
                    </View>

                    {/* RFID block — special treatment */}
                    <View style={styles.tagSection}>
                        <Text style={styles.sectionLabel}>RFID TAG</Text>
                        <View style={styles.tagRow}>
                            <View style={styles.tagInputWrap}>
                                <Input
                                    label=""
                                    value={rfidTag}
                                    onChangeText={(t) =>
                                        setRfidTag(t.toUpperCase())
                                    }
                                    placeholder="Tag UID"
                                    autoCapitalize="characters"
                                />
                            </View>
                            <Pressable
                                onPress={scanForTag}
                                disabled={scanning}
                                style={[
                                    styles.scanBtn,
                                    scanning && { opacity: 0.7 },
                                ]}
                            >
                                <ScanIcon
                                    size={22}
                                    color={colors.textInverse}
                                    strokeWidth={1.8}
                                />
                            </Pressable>
                        </View>
                        <Text style={styles.helpText}>
                            Tap the scan icon and hold the card near the device.
                        </Text>
                    </View>

                    {/* Identity */}
                    <Text style={styles.sectionLabel}>IDENTITY</Text>
                    <View style={styles.section}>
                        <Input
                            label="Full name"
                            value={fullName}
                            onChangeText={setFullName}
                            placeholder="e.g. Adaeze Okafor"
                        />
                        <Input
                            label="Phone"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                            placeholder="0801 234 5678"
                        />
                        <Input
                            label="National ID"
                            value={nationalId}
                            onChangeText={setNationalId}
                            placeholder="Optional"
                        />

                        <Text style={styles.fieldLabel}>Gender</Text>
                        <View style={styles.pillsRow}>
                            <GenderPill value="Male" />
                            <GenderPill value="Female" />
                        </View>
                    </View>

                    {/* Location */}
                    <Text style={styles.sectionLabel}>LOCATION</Text>
                    <View style={styles.section}>
                        <Input
                            label="State"
                            value={state}
                            onChangeText={setState}
                            placeholder="e.g. Kaduna"
                        />
                        <Input
                            label="LGA"
                            value={lga}
                            onChangeText={setLga}
                            placeholder="Local government area"
                        />
                        <Input
                            label="Community"
                            value={community}
                            onChangeText={setCommunity}
                            placeholder="Optional"
                        />
                    </View>

                    {/* Farm */}
                    <Text style={styles.sectionLabel}>FARM</Text>
                    <View style={styles.section}>
                        <Input
                            label="Primary crop"
                            value={primaryCrop}
                            onChangeText={setPrimaryCrop}
                            placeholder="e.g. Maize"
                        />
                        <Input
                            label="Farm size (ha)"
                            value={farmSize}
                            onChangeText={setFarmSize}
                            keyboardType="numeric"
                            placeholder="Optional"
                        />
                        <Input
                            label="Cooperative"
                            value={cooperative}
                            onChangeText={setCooperative}
                            placeholder="Optional"
                        />
                    </View>

                    <Button
                        label="Register farmer"
                        onPress={onSubmit}
                        loading={submitting}
                        style={{ marginTop: 8 }}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 140,
    },
    hero: { marginBottom: 24 },
    eyebrow: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 2.4,
        color: colors.primary,
        marginBottom: 12,
    },
    title: {
        fontSize: 32,
        lineHeight: 36,
        letterSpacing: -0.5,
        color: colors.text,
        marginBottom: 10,
    },
    titleLead: { fontWeight: '400' },
    titleAccent: { fontWeight: '700' },
    lede: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.textMuted,
    },
    tagSection: {
        backgroundColor: palette.brandSoft,
        borderRadius: 20,
        padding: 16,
        marginBottom: 24,
    },
    sectionLabel: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.8,
        color: colors.textMuted,
        marginBottom: 10,
    },
    tagRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
    },
    tagInputWrap: { flex: 1 },
    scanBtn: {
        width: 52,
        height: 52,
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    helpText: {
        fontSize: 12,
        color: colors.textMuted,
        marginTop: 6,
    },
    section: {
        marginBottom: 8,
    },
    fieldLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 8,
    },
    pillsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
    pill: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: radius.pill,
        borderWidth: 1.5,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
    },
    pillActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    pillText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
    },
    pillTextActive: {
        color: colors.textInverse,
    },
});
