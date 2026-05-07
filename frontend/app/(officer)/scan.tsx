import { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { AppBar, Button, Screen, Text } from '../../components/ui';
import { Check, Close, Scan as ScanIcon } from '../../assets/icons';
import { isNfcSupported, isNfcEnabled, readTag, cancel } from '../../lib/nfc';
import { lookupFarmerByTag } from '../../lib/farmers';
import { ApiError } from '../../lib/api';
import { colors, palette, radius, space } from '../../theme';

type ScanState = 'idle' | 'scanning' | 'success' | 'unknown' | 'error';

const RING_DURATION = 2100;

function PulseRing({
    delay,
    active,
    color,
}: {
    delay: number;
    active: boolean;
    color: string;
}) {
    const progress = useSharedValue(0);

    useEffect(() => {
        if (active) {
            progress.value = 0;
            progress.value = withDelay(
                delay,
                withRepeat(
                    withTiming(1, {
                        duration: RING_DURATION,
                        easing: Easing.out(Easing.cubic),
                    }),
                    -1,
                    false
                )
            );
        } else {
            cancelAnimation(progress);
            progress.value = withTiming(0, { duration: 220 });
        }
        return () => cancelAnimation(progress);
    }, [active, delay, progress]);

    const style = useAnimatedStyle(() => ({
        transform: [{ scale: 0.5 + progress.value * 1.4 }],
        opacity: (1 - progress.value) * 0.6,
        borderColor: color,
    }));

    return <Animated.View pointerEvents="none" style={[styles.ring, style]} />;
}

export default function Scan() {
    const router = useRouter();
    const [scanState, setScanState] = useState<ScanState>('idle');
    const [tag, setTag] = useState<string | null>(null);
    const [status, setStatus] = useState<string>(
        'Tap the button and hold the tag near the device.'
    );

    const targetScale = useSharedValue(1);
    const targetShake = useSharedValue(0);
    const checkScale = useSharedValue(0);
    const errorScale = useSharedValue(0);

    const targetStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: targetShake.value },
            { scale: targetScale.value },
        ],
    }));

    const checkStyle = useAnimatedStyle(() => ({
        opacity: checkScale.value > 0 ? 1 : 0,
        transform: [{ scale: checkScale.value }],
    }));

    const errorStyle = useAnimatedStyle(() => ({
        opacity: errorScale.value > 0 ? 1 : 0,
        transform: [{ scale: errorScale.value }],
    }));

    const playSuccess = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(
            () => {}
        );
        targetScale.value = withSequence(
            withSpring(1.1, { damping: 14, stiffness: 280 }),
            withSpring(1, { damping: 16, stiffness: 220 })
        );
        checkScale.value = withSequence(
            withTiming(0, { duration: 0 }),
            withSpring(1.2, { damping: 12, stiffness: 240, mass: 0.6 }),
            withSpring(1, { damping: 14, stiffness: 220 })
        );
    };

    const playError = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(
            () => {}
        );
        targetShake.value = withSequence(
            withTiming(-10, { duration: 60 }),
            withTiming(10, { duration: 60 }),
            withTiming(-8, { duration: 60 }),
            withTiming(8, { duration: 60 }),
            withTiming(0, { duration: 60 })
        );
        errorScale.value = withSequence(
            withTiming(0, { duration: 0 }),
            withSpring(1.15, { damping: 12, stiffness: 240, mass: 0.6 }),
            withSpring(1, { damping: 14, stiffness: 220 })
        );
    };

    const resetGlyphs = () => {
        checkScale.value = withTiming(0, { duration: 220 });
        errorScale.value = withTiming(0, { duration: 220 });
    };

    const onScan = async () => {
        const supported = await isNfcSupported();
        if (!supported) {
            Alert.alert(
                'NFC unavailable',
                Platform.OS === 'web'
                    ? 'NFC is not supported on web.'
                    : 'This device does not support NFC.'
            );
            return;
        }
        const enabled = await isNfcEnabled();
        if (!enabled) {
            Alert.alert(
                'NFC disabled',
                'Enable NFC in your device settings and try again.'
            );
            return;
        }

        Haptics.selectionAsync().catch(() => {});
        resetGlyphs();
        setScanState('scanning');
        setStatus('Hold the RFID tag near the device…');
        try {
            const uid = await readTag();
            setTag(uid);
            setStatus('Tag read. Looking up farmer…');
            try {
                const { farmer } = await lookupFarmerByTag(uid);
                playSuccess();
                setScanState('success');
                setStatus('Found. Opening profile…');
                setTimeout(() => {
                    router.push({
                        pathname: '/(farmer)/[id]',
                        params: { id: farmer._id },
                    });
                }, 600);
            } catch (e) {
                if (e instanceof ApiError && e.status === 404) {
                    playError();
                    setScanState('unknown');
                    setStatus('No farmer is bound to this tag.');
                    setTimeout(() => {
                        Alert.alert(
                            'Unknown tag',
                            `UID: ${uid}`,
                            [
                                {
                                    text: 'Register farmer',
                                    onPress: () =>
                                        router.push({
                                            pathname:
                                                '/(officer)/register-farmer',
                                            params: { tag: uid },
                                        }),
                                },
                                { text: 'OK', style: 'cancel' },
                            ]
                        );
                    }, 350);
                } else {
                    playError();
                    setScanState('error');
                    setStatus('Lookup failed.');
                    Alert.alert(
                        'Lookup failed',
                        e instanceof ApiError ? e.message : 'Try again'
                    );
                }
            }
        } catch (e: any) {
            setScanState('idle');
            setStatus('Scan cancelled.');
            if (e?.message && !`${e.message}`.toLowerCase().includes('cancel')) {
                playError();
                setStatus('Scan failed.');
                Alert.alert('Scan failed', `${e.message}`);
            }
        } finally {
            cancel();
        }
    };

    const isPulsing = scanState === 'idle' || scanState === 'scanning';
    const ringColor =
        scanState === 'unknown' || scanState === 'error'
            ? colors.danger
            : colors.primary;

    return (
        <Screen>
            <AppBar title="Scan tag" />
            <View style={styles.body}>
                <View style={styles.stage}>
                    {/* Pulse rings — three offset waves */}
                    <PulseRing delay={0} active={isPulsing} color={ringColor} />
                    <PulseRing
                        delay={RING_DURATION / 3}
                        active={isPulsing}
                        color={ringColor}
                    />
                    <PulseRing
                        delay={(RING_DURATION / 3) * 2}
                        active={isPulsing}
                        color={ringColor}
                    />

                    {/* Center target */}
                    <Animated.View style={[styles.target, targetStyle]}>
                        <View style={styles.targetInner}>
                            <ScanIcon
                                size={48}
                                color={colors.primary}
                                strokeWidth={1.5}
                            />
                        </View>

                        {/* Success bloom */}
                        <Animated.View
                            style={[styles.glyphOverlay, checkStyle]}
                            pointerEvents="none"
                        >
                            <View
                                style={[
                                    styles.glyphCircle,
                                    { backgroundColor: colors.primary },
                                ]}
                            >
                                <Check
                                    size={48}
                                    color={colors.textInverse}
                                    strokeWidth={3}
                                />
                            </View>
                        </Animated.View>

                        {/* Error bloom */}
                        <Animated.View
                            style={[styles.glyphOverlay, errorStyle]}
                            pointerEvents="none"
                        >
                            <View
                                style={[
                                    styles.glyphCircle,
                                    { backgroundColor: colors.danger },
                                ]}
                            >
                                <Close
                                    size={42}
                                    color={colors.textInverse}
                                    strokeWidth={3}
                                />
                            </View>
                        </Animated.View>
                    </Animated.View>
                </View>

                <Text
                    variant="title"
                    style={{ textAlign: 'center', marginTop: space.xl }}
                >
                    {scanState === 'success'
                        ? 'Got it'
                        : scanState === 'unknown'
                          ? 'Unknown tag'
                          : scanState === 'error'
                            ? 'Something went wrong'
                            : 'Scan RFID tag'}
                </Text>
                <Text
                    variant="body"
                    tone="muted"
                    style={{ textAlign: 'center', marginTop: 6 }}
                >
                    {status}
                </Text>
                {tag ? (
                    <View style={styles.tagPill}>
                        <Text variant="mono" tone="primary">
                            UID: {tag}
                        </Text>
                    </View>
                ) : null}
            </View>
            <View style={styles.actionRow}>
                <Button
                    label={scanState === 'scanning' ? 'Scanning…' : 'Scan tag'}
                    onPress={onScan}
                    loading={scanState === 'scanning'}
                    icon="scan"
                />
            </View>
        </Screen>
    );
}

const STAGE = 280;
const TARGET = 160;
const RING = STAGE;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        paddingHorizontal: space.lg,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 120,
    },
    stage: {
        width: STAGE,
        height: STAGE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ring: {
        position: 'absolute',
        width: RING,
        height: RING,
        borderRadius: RING / 2,
        borderWidth: 2,
    },
    target: {
        width: TARGET,
        height: TARGET,
        borderRadius: TARGET / 2,
        backgroundColor: palette.brandSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
    targetInner: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
    },
    glyphOverlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    glyphCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tagPill: {
        marginTop: space.lg,
        paddingHorizontal: space.md,
        paddingVertical: 6,
        backgroundColor: palette.brandSoft,
        borderRadius: radius.pill,
    },
    actionRow: {
        paddingHorizontal: space.lg,
        paddingBottom: 100,
    },
});
