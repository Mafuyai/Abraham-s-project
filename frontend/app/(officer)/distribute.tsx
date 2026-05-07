import { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
    AppBar,
    Avatar,
    Button,
    Icon,
    Screen,
} from '../../components/ui';
import { Scan as ScanIcon } from '../../assets/icons';
import { isNfcSupported, readTag, cancel as cancelNfc } from '../../lib/nfc';
import {
    listInputs,
    lookupFarmerByTag,
    createDistribution,
} from '../../lib/farmers';
import { ApiError } from '../../lib/api';
import { Farmer, Input as InputType } from '../../lib/types';
import { colors, palette, radius } from '../../theme';

type Line = { input: InputType; quantity: number };

export default function Distribute() {
    const router = useRouter();
    const params = useLocalSearchParams<{ tag?: string }>();
    const [tag, setTag] = useState(params.tag || '');
    const [farmer, setFarmer] = useState<Farmer | null>(null);
    const [scanning, setScanning] = useState(false);
    const [resolving, setResolving] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [inputs, setInputs] = useState<InputType[]>([]);
    const [lines, setLines] = useState<Line[]>([]);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        listInputs()
            .then((d) => setInputs(d.items.filter((i) => i.active)))
            .catch(() => {});
    }, []);

    const onScan = async () => {
        const supported = await isNfcSupported();
        if (!supported) {
            Alert.alert('NFC unavailable');
            return;
        }
        Haptics.selectionAsync().catch(() => {});
        setScanning(true);
        try {
            const uid = await readTag();
            setTag(uid);
            await resolveTag(uid);
        } catch (e: any) {
            if (e?.message && !`${e.message}`.toLowerCase().includes('cancel')) {
                Alert.alert('Scan failed', `${e.message}`);
            }
        } finally {
            setScanning(false);
            cancelNfc();
        }
    };

    const resolveTag = async (uid: string) => {
        setResolving(true);
        try {
            const { farmer } = await lookupFarmerByTag(uid);
            setFarmer(farmer);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            ).catch(() => {});
        } catch (e) {
            setFarmer(null);
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            ).catch(() => {});
            Alert.alert(
                'Unknown tag',
                e instanceof ApiError ? e.message : 'Could not look up farmer'
            );
        } finally {
            setResolving(false);
        }
    };

    const toggleInput = (input: InputType) => {
        Haptics.selectionAsync().catch(() => {});
        setLines((ls) => {
            const exists = ls.find((l) => l.input._id === input._id);
            if (exists) return ls.filter((l) => l.input._id !== input._id);
            return [...ls, { input, quantity: 1 }];
        });
    };

    const adjustQty = (id: string, delta: number) => {
        Haptics.selectionAsync().catch(() => {});
        setLines((ls) =>
            ls
                .map((l) =>
                    l.input._id === id
                        ? { ...l, quantity: Math.max(1, l.quantity + delta) }
                        : l
                )
                .filter((l) => l.quantity > 0)
        );
    };

    const onSubmit = async () => {
        if (!farmer) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            ).catch(() => {});
            Alert.alert('No farmer', 'Scan a tag and resolve the farmer first');
            return;
        }
        if (lines.length === 0) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
            ).catch(() => {});
            Alert.alert(
                'Pick inputs',
                'Add at least one input to distribute'
            );
            return;
        }
        for (const l of lines) {
            if (l.quantity > l.input.stock) {
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Warning
                ).catch(() => {});
                Alert.alert(
                    'Over stock',
                    `${l.input.name} has only ${l.input.stock} ${l.input.unit} left.`
                );
                return;
            }
        }
        setSubmitting(true);
        try {
            await createDistribution({
                rfidTag: farmer.rfidTag,
                items: lines.map((l) => ({
                    input: l.input._id,
                    quantity: l.quantity,
                })),
                location: {
                    state: farmer.state,
                    lga: farmer.lga,
                    community: farmer.community,
                },
                notes: notes || undefined,
            });
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
            ).catch(() => {});
            Alert.alert('Recorded', 'Distribution saved.', [
                { text: 'OK', onPress: () => router.replace('/(officer)') },
            ]);
        } catch (e) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            ).catch(() => {});
            Alert.alert(
                'Failed',
                e instanceof ApiError ? e.message : 'Could not save'
            );
        } finally {
            setSubmitting(false);
        }
    };

    const stepDone = (n: 1 | 2 | 3) => {
        if (n === 1) return !!farmer;
        if (n === 2) return lines.length > 0;
        return notes.trim().length > 0;
    };

    return (
        <Screen>
            <AppBar showBack title="Record distribution" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Step indicator */}
                    <View style={styles.steps}>
                        <StepDot n={1} done={stepDone(1)} />
                        <StepLine />
                        <StepDot n={2} done={stepDone(2)} />
                        <StepLine />
                        <StepDot n={3} done={stepDone(3)} />
                    </View>

                    {/* Step 1: Identify farmer */}
                    <Step
                        n={1}
                        title="Identify farmer"
                        hint="Scan a tag or enter the UID."
                    >
                        <View style={styles.tagRow}>
                            <View style={styles.tagInputWrap}>
                                <TextInput
                                    style={styles.tagInput}
                                    value={tag}
                                    onChangeText={(t) => setTag(t.toUpperCase())}
                                    placeholder="RFID UID"
                                    placeholderTextColor={colors.textSubtle}
                                    autoCapitalize="characters"
                                />
                            </View>
                            <Pressable
                                onPress={onScan}
                                disabled={scanning}
                                style={[
                                    styles.scanBtn,
                                    scanning && { opacity: 0.7 },
                                ]}
                            >
                                <ScanIcon
                                    size={20}
                                    color={colors.textInverse}
                                    strokeWidth={1.8}
                                />
                            </Pressable>
                        </View>
                        <Pressable
                            onPress={() => tag && resolveTag(tag)}
                            disabled={!tag || resolving}
                            style={[
                                styles.lookupBtn,
                                (!tag || resolving) && { opacity: 0.5 },
                            ]}
                        >
                            <Text style={styles.lookupBtnText}>
                                {resolving ? 'Looking up…' : 'Look up'}
                            </Text>
                        </Pressable>

                        {farmer ? (
                            <View style={styles.farmerCard}>
                                <Avatar name={farmer.fullName} size={44} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.farmerName}>
                                        {farmer.fullName}
                                    </Text>
                                    <Text style={styles.farmerMeta}>
                                        {farmer.state} · {farmer.lga} ·{' '}
                                        {farmer.phone}
                                    </Text>
                                </View>
                                <View style={styles.farmerCheck}>
                                    <Icon
                                        name="check"
                                        size={14}
                                        color={colors.textInverse}
                                        strokeWidth={3}
                                    />
                                </View>
                            </View>
                        ) : null}
                    </Step>

                    {/* Step 2: Add inputs */}
                    <Step
                        n={2}
                        title="Add inputs"
                        hint="Tap to add. Adjust quantities below."
                    >
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.chipsRow}
                        >
                            {inputs.map((i) => {
                                const selected = lines.some(
                                    (l) => l.input._id === i._id
                                );
                                const lowStock = i.stock < 10;
                                return (
                                    <Pressable
                                        key={i._id}
                                        onPress={() => toggleInput(i)}
                                        style={[
                                            styles.inputChip,
                                            selected && styles.inputChipSelected,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.inputChipName,
                                                selected &&
                                                    styles.inputChipNameSel,
                                            ]}
                                        >
                                            {i.name}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.inputChipStock,
                                                selected &&
                                                    styles.inputChipStockSel,
                                                lowStock && {
                                                    color: colors.warning,
                                                },
                                            ]}
                                        >
                                            {i.stock} {i.unit}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </ScrollView>

                        {lines.length > 0 ? (
                            <View style={styles.linesWrap}>
                                {lines.map((l) => {
                                    const overStock = l.quantity > l.input.stock;
                                    return (
                                        <View
                                            key={l.input._id}
                                            style={styles.lineRow}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text style={styles.lineName}>
                                                    {l.input.name}
                                                </Text>
                                                <Text
                                                    style={[
                                                        styles.lineMeta,
                                                        overStock && {
                                                            color: colors.danger,
                                                        },
                                                    ]}
                                                >
                                                    {l.input.category} · stock{' '}
                                                    {l.input.stock}{' '}
                                                    {l.input.unit}
                                                </Text>
                                            </View>
                                            <View style={styles.stepper}>
                                                <Pressable
                                                    onPress={() =>
                                                        adjustQty(
                                                            l.input._id,
                                                            -1
                                                        )
                                                    }
                                                    style={styles.stepperBtn}
                                                >
                                                    <Text
                                                        style={
                                                            styles.stepperGlyph
                                                        }
                                                    >
                                                        −
                                                    </Text>
                                                </Pressable>
                                                <Text style={styles.qtyValue}>
                                                    {l.quantity}
                                                </Text>
                                                <Pressable
                                                    onPress={() =>
                                                        adjustQty(
                                                            l.input._id,
                                                            +1
                                                        )
                                                    }
                                                    style={styles.stepperBtn}
                                                >
                                                    <Text
                                                        style={
                                                            styles.stepperGlyph
                                                        }
                                                    >
                                                        +
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        ) : null}
                    </Step>

                    {/* Step 3: Notes */}
                    <Step n={3} title="Notes" hint="Optional context.">
                        <TextInput
                            style={styles.notes}
                            value={notes}
                            onChangeText={setNotes}
                            placeholder="e.g. delivered at the cooperative depot"
                            placeholderTextColor={colors.textSubtle}
                            multiline
                        />
                    </Step>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Sticky save */}
            <View style={styles.bottom}>
                <Button
                    label="Save distribution"
                    onPress={onSubmit}
                    loading={submitting}
                    disabled={!farmer || lines.length === 0}
                />
            </View>
        </Screen>
    );
}

function StepDot({ n, done }: { n: number; done: boolean }) {
    return (
        <View style={[styles.stepDot, done && styles.stepDotDone]}>
            {done ? (
                <Icon
                    name="check"
                    size={12}
                    color={colors.textInverse}
                    strokeWidth={3}
                />
            ) : (
                <Text style={styles.stepDotText}>{n}</Text>
            )}
        </View>
    );
}

function StepLine() {
    return <View style={styles.stepLine} />;
}

function Step({
    n,
    title,
    hint,
    children,
}: {
    n: number;
    title: string;
    hint?: string;
    children: React.ReactNode;
}) {
    return (
        <View style={styles.stepBlock}>
            <View style={styles.stepHeader}>
                <Text style={styles.stepNumber}>STEP 0{n}</Text>
                <Text style={styles.stepTitle}>{title}</Text>
                {hint ? <Text style={styles.stepHint}>{hint}</Text> : null}
            </View>
            <View style={styles.stepBody}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 140,
    },
    steps: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 8,
        gap: 4,
    },
    stepDot: {
        width: 26,
        height: 26,
        borderRadius: 13,
        borderWidth: 1.5,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.surface,
    },
    stepDotDone: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    stepDotText: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.textMuted,
    },
    stepLine: {
        width: 32,
        height: 1,
        backgroundColor: colors.border,
    },
    stepBlock: {
        marginTop: 22,
    },
    stepHeader: { marginBottom: 12 },
    stepNumber: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.6,
        color: colors.primary,
        marginBottom: 4,
    },
    stepTitle: {
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: -0.3,
        color: colors.text,
    },
    stepHint: {
        fontSize: 13,
        color: colors.textMuted,
        marginTop: 2,
    },
    stepBody: {},
    tagRow: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    tagInputWrap: { flex: 1 },
    tagInput: {
        height: 52,
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        paddingHorizontal: 14,
        fontSize: 16,
        color: colors.text,
        letterSpacing: 1,
    },
    scanBtn: {
        width: 52,
        height: 52,
        borderRadius: radius.md,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lookupBtn: {
        marginTop: 10,
        height: 44,
        borderRadius: radius.md,
        borderWidth: 1.5,
        borderColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    lookupBtnText: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.primary,
        letterSpacing: 0.3,
    },
    farmerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 14,
        backgroundColor: palette.brandSoft,
        borderRadius: radius.lg,
        marginTop: 12,
    },
    farmerName: { fontWeight: '700', fontSize: 15, color: colors.text },
    farmerMeta: {
        color: colors.textMuted,
        fontSize: 12,
        marginTop: 2,
    },
    farmerCheck: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chipsRow: { gap: 8, paddingRight: 24 },
    inputChip: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        alignItems: 'flex-start',
        minWidth: 130,
    },
    inputChipSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    inputChipName: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.text,
    },
    inputChipNameSel: { color: colors.textInverse },
    inputChipStock: {
        fontSize: 11,
        color: colors.textMuted,
        marginTop: 2,
        fontWeight: '600',
    },
    inputChipStockSel: {
        color: 'rgba(255,255,255,0.85)',
    },
    linesWrap: { marginTop: 14, gap: 8 },
    lineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.lg,
        backgroundColor: colors.surface,
    },
    lineName: { fontWeight: '700', fontSize: 14, color: colors.text },
    lineMeta: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: palette.brandSoft,
        borderRadius: radius.pill,
        padding: 4,
    },
    stepperBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepperGlyph: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        marginTop: -2,
    },
    qtyValue: {
        minWidth: 24,
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '700',
        color: colors.text,
    },
    notes: {
        borderRadius: radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        padding: 14,
        minHeight: 90,
        textAlignVertical: 'top',
        fontSize: 15,
        color: colors.text,
    },
    bottom: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 88,
    },
});
