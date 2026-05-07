import { useCallback, useState } from 'react';
import {
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import {
    CountUp,
    Icon,
    PressableCard,
    Screen,
} from '../../components/ui';
import { Scan as ScanIcon } from '../../assets/icons';
import { useAuth } from '../../lib/auth';
import { listDistributions, listFarmers } from '../../lib/farmers';
import { Distribution, Farmer, Input } from '../../lib/types';
import { colors, palette, radius } from '../../theme';

export default function OfficerHome() {
    const { user } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({ farmers: 0, distributions: 0 });
    const [recent, setRecent] = useState<Distribution[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const load = useCallback(async () => {
        const [f, d] = await Promise.all([
            listFarmers({ limit: 1 }),
            listDistributions({ officer: user?.id, limit: 3 }),
        ]);
        setStats({ farmers: f.total, distributions: d.total });
        setRecent(d.items);
    }, [user?.id]);

    useFocusEffect(
        useCallback(() => {
            load().catch(() => {});
        }, [load])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await load();
        } catch {}
        setRefreshing(false);
    };

    const firstName = user?.name?.split(' ')[0] ?? 'there';

    const goScan = () => {
        Haptics.selectionAsync().catch(() => {});
        router.push('/(officer)/scan');
    };

    return (
        <Screen>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.text}
                    />
                }
            >
                {/* Hero greeting */}
                <View style={styles.hero}>
                    <Text style={styles.eyebrow}>FIELD OFFICER</Text>
                    <Text style={styles.greeting}>
                        <Text style={styles.greetingLead}>Hello, </Text>
                        <Text style={styles.greetingAccent}>{firstName}.</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        Tap a tag to start. We'll do the rest.
                    </Text>
                </View>

                {/* Hero scan CTA */}
                <PressableCard onPress={goScan} style={styles.scanHero} haptic={false}>
                    <View style={styles.scanIconWrap}>
                        <ScanIcon
                            size={40}
                            color={colors.textInverse}
                            strokeWidth={1.6}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.scanLabel}>READY WHEN YOU ARE</Text>
                        <Text style={styles.scanTitle}>Scan a tag</Text>
                        <Text style={styles.scanHint}>
                            Hold an RFID card to the back of the device.
                        </Text>
                    </View>
                    <View style={styles.scanArrow}>
                        <Text style={styles.scanArrowGlyph}>→</Text>
                    </View>
                </PressableCard>

                {/* Two stats */}
                <View style={styles.statRow}>
                    <PressableCard
                        onPress={() => router.push('/(officer)/history')}
                        style={[styles.stat, { flex: 1 }]}
                    >
                        <CountUp
                            value={stats.farmers}
                            style={styles.statValue}
                        />
                        <Text style={styles.statLabel}>FARMERS IN SYSTEM</Text>
                    </PressableCard>
                    <PressableCard
                        onPress={() => router.push('/(officer)/history')}
                        style={[styles.stat, { flex: 1 }]}
                    >
                        <CountUp
                            value={stats.distributions}
                            style={styles.statValue}
                        />
                        <Text style={styles.statLabel}>MY DISTRIBUTIONS</Text>
                    </PressableCard>
                </View>

                {/* Quick actions — proper rows */}
                <Text style={styles.sectionTitle}>Quick actions</Text>
                <View style={styles.actions}>
                    <Action
                        icon="user-plus"
                        title="Register a farmer"
                        hint="Bind a new RFID tag to a farmer"
                        onPress={() => router.push('/(officer)/register-farmer')}
                    />
                    <Action
                        icon="leaf"
                        title="Record distribution"
                        hint="Issue inputs to a scanned farmer"
                        onPress={() => router.push('/(officer)/distribute')}
                    />
                    <Action
                        icon="clock"
                        title="My distribution history"
                        hint="Records you've created recently"
                        onPress={() => router.push('/(officer)/history')}
                    />
                </View>

                {/* Latest activity */}
                {recent.length > 0 ? (
                    <>
                        <View style={styles.recentHeader}>
                            <Text style={styles.sectionTitle}>Latest from you</Text>
                            <Pressable
                                onPress={() =>
                                    router.push('/(officer)/history')
                                }
                                hitSlop={8}
                            >
                                <Text style={styles.linkSmall}>See all →</Text>
                            </Pressable>
                        </View>
                        <View style={{ gap: 10 }}>
                            {recent.map((d) => (
                                <RecentRow key={d._id} item={d} />
                            ))}
                        </View>
                    </>
                ) : null}
            </ScrollView>
        </Screen>
    );
}

function Action({
    icon,
    title,
    hint,
    onPress,
}: {
    icon: 'user-plus' | 'leaf' | 'clock';
    title: string;
    hint: string;
    onPress: () => void;
}) {
    return (
        <PressableCard onPress={onPress} style={styles.action}>
            <View style={styles.actionIcon}>
                <Icon name={icon} size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.actionTitle}>{title}</Text>
                <Text style={styles.actionHint}>{hint}</Text>
            </View>
            <Icon name="chevron-right" size={16} color={colors.textSubtle} />
        </PressableCard>
    );
}

function RecentRow({ item }: { item: Distribution }) {
    const farmer = item.farmer as Farmer;
    const lines = item.items
        .map((l) => {
            const inp = l.input as Input;
            return `${inp?.name ?? 'Input'} ×${l.quantity}`;
        })
        .slice(0, 2)
        .join(' · ');

    return (
        <View style={styles.recentRow}>
            <View style={styles.recentDot} />
            <View style={{ flex: 1 }}>
                <Text style={styles.recentTitle}>
                    {farmer?.fullName ?? 'Farmer'}
                </Text>
                <Text style={styles.recentMeta}>
                    {lines || 'Distribution'}
                </Text>
            </View>
            <Text style={styles.recentTime}>
                {new Date(item.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 24,
        paddingTop: 12,
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
    greeting: {
        fontSize: 36,
        lineHeight: 40,
        letterSpacing: -0.5,
        color: colors.text,
        marginBottom: 8,
    },
    greetingLead: { fontWeight: '400' },
    greetingAccent: { fontWeight: '700' },
    subtitle: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.textMuted,
    },
    scanHero: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        padding: 20,
        borderRadius: 24,
        backgroundColor: palette.brand,
        marginBottom: 16,
        shadowColor: palette.brand,
        shadowOpacity: 0.3,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
    },
    scanIconWrap: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: 'rgba(255,255,255,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(255,255,255,0.35)',
    },
    scanLabel: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.6,
        color: 'rgba(255,255,255,0.7)',
        marginBottom: 4,
    },
    scanTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: -0.4,
        marginBottom: 4,
    },
    scanHint: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.75)',
    },
    scanArrow: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.18)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scanArrowGlyph: {
        fontSize: 18,
        color: '#FFFFFF',
        marginTop: -2,
    },
    statRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 28,
    },
    stat: {
        padding: 14,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.text,
        letterSpacing: -0.4,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 1.2,
        color: colors.textMuted,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 12,
    },
    actions: {
        gap: 8,
        marginBottom: 28,
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    actionIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: palette.brandSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
    },
    actionHint: {
        fontSize: 12,
        color: colors.textMuted,
        marginTop: 2,
    },
    recentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    linkSmall: {
        fontSize: 13,
        color: colors.primary,
        fontWeight: '600',
    },
    recentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    recentDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
    },
    recentTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.text,
    },
    recentMeta: {
        fontSize: 12,
        color: colors.textMuted,
        marginTop: 2,
    },
    recentTime: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.textSubtle,
    },
});
