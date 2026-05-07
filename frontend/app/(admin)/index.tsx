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
import { Screen, Icon, CountUp, PressableCard } from '../../components/ui';
import { useAuth } from '../../lib/auth';
import {
    listFarmers,
    listInputs,
    listDistributions,
} from '../../lib/farmers';
import { apiGet } from '../../lib/api';
import { Distribution, Farmer, Input } from '../../lib/types';
import { colors, palette, radius } from '../../theme';

export default function AdminHome() {
    const { user } = useAuth();
    const router = useRouter();

    const [stats, setStats] = useState({
        farmers: 0,
        officers: 0,
        inputs: 0,
        distributions: 0,
    });
    const [recent, setRecent] = useState<Distribution[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const load = useCallback(async () => {
        const [f, i, d, o] = await Promise.all([
            listFarmers({ limit: 1 }),
            listInputs(),
            listDistributions({ limit: 3 }),
            apiGet<{ items: any[] }>('/officers'),
        ]);
        setStats({
            farmers: f.total,
            inputs: i.items.length,
            distributions: d.total,
            officers: o.items.length,
        });
        setRecent(d.items);
    }, []);

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
                    <Text style={styles.eyebrow}>PROGRAM ADMIN</Text>
                    <Text style={styles.greeting}>
                        <Text style={styles.greetingLead}>Hello, </Text>
                        <Text style={styles.greetingAccent}>{firstName}.</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        Here's how the program is moving today.
                    </Text>
                </View>

                {/* Hero stat — farmers */}
                <PressableCard
                    onPress={() => router.push('/(admin)/officers')}
                    style={styles.heroStat}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={styles.heroStatLabel}>
                            FARMERS REGISTERED
                        </Text>
                        <CountUp
                            value={stats.farmers}
                            style={styles.heroStatValue}
                        />
                        <Text style={styles.heroStatHint}>
                            Across the program · tap for officer activity
                        </Text>
                    </View>
                    <View style={styles.heroStatArrow}>
                        <Text style={styles.heroStatArrowGlyph}>→</Text>
                    </View>
                </PressableCard>

                {/* Secondary stats */}
                <View style={styles.statRow}>
                    <Stat
                        label="Officers"
                        value={stats.officers}
                        onPress={() => router.push('/(admin)/officers')}
                    />
                    <Stat
                        label="Inputs"
                        value={stats.inputs}
                        onPress={() => router.push('/(admin)/inputs')}
                    />
                    <Stat
                        label="Distributions"
                        value={stats.distributions}
                        onPress={() => router.push('/(admin)/distributions')}
                    />
                </View>

                {/* Quick actions */}
                <Text style={styles.sectionTitle}>Quick actions</Text>
                <View style={styles.actions}>
                    <Action
                        icon="cube"
                        label="Add an input"
                        onPress={() => router.push('/(admin)/inputs')}
                    />
                    <Action
                        icon="people"
                        label="Manage officers"
                        onPress={() => router.push('/(admin)/officers')}
                    />
                    <Action
                        icon="list"
                        label="Activity log"
                        onPress={() => router.push('/(admin)/distributions')}
                    />
                </View>

                {/* Recent activity */}
                <View style={styles.recentHeader}>
                    <Text style={styles.sectionTitle}>Latest activity</Text>
                    {recent.length > 0 ? (
                        <Pressable
                            onPress={() => router.push('/(admin)/distributions')}
                            hitSlop={8}
                        >
                            <Text style={styles.linkSmall}>See all →</Text>
                        </Pressable>
                    ) : null}
                </View>
                {recent.length === 0 ? (
                    <View style={styles.empty}>
                        <Text style={styles.emptyTitle}>Nothing yet today</Text>
                        <Text style={styles.emptyBody}>
                            Officer distributions will appear here as they're
                            recorded.
                        </Text>
                    </View>
                ) : (
                    <View style={{ gap: 10 }}>
                        {recent.map((d) => (
                            <RecentRow key={d._id} item={d} />
                        ))}
                    </View>
                )}
            </ScrollView>
        </Screen>
    );
}

function Stat({
    label,
    value,
    onPress,
}: {
    label: string;
    value: number;
    onPress: () => void;
}) {
    return (
        <PressableCard onPress={onPress} style={[styles.stat, { flex: 1 }]}>
            <CountUp value={value} style={styles.statValue} />
            <Text style={styles.statLabel}>{label.toUpperCase()}</Text>
        </PressableCard>
    );
}

function Action({
    icon,
    label,
    onPress,
}: {
    icon: 'cube' | 'people' | 'list';
    label: string;
    onPress: () => void;
}) {
    return (
        <PressableCard onPress={onPress} style={styles.action}>
            <View style={styles.actionIcon}>
                <Icon name={icon} size={18} color={colors.primary} />
            </View>
            <Text style={styles.actionLabel}>{label}</Text>
            <Icon
                name="chevron-right"
                size={16}
                color={colors.textSubtle}
            />
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

    const date = new Date(item.createdAt);
    const time = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <View style={styles.recentRow}>
            <View style={styles.recentDot} />
            <View style={{ flex: 1 }}>
                <Text style={styles.recentTitle}>
                    {farmer?.fullName ?? 'Farmer'}
                </Text>
                <Text style={styles.recentMeta}>
                    {lines || 'Distribution'} · {time}
                </Text>
            </View>
            <Text style={styles.recentBy}>
                {item.officer?.name?.split(' ')[0] ?? ''}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 120,
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
    heroStat: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 22,
        borderRadius: 24,
        backgroundColor: palette.brandSoft,
        marginBottom: 16,
    },
    heroStatLabel: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.8,
        color: colors.primary,
        marginBottom: 6,
    },
    heroStatValue: {
        fontSize: 56,
        lineHeight: 60,
        fontWeight: '700',
        letterSpacing: -1.5,
        color: colors.text,
        marginBottom: 6,
    },
    heroStatHint: {
        fontSize: 12,
        color: colors.textMuted,
    },
    heroStatArrow: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.surface,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },
    heroStatArrowGlyph: {
        fontSize: 18,
        color: colors.text,
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
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: palette.brandSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionLabel: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
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
    empty: {
        padding: 18,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    emptyTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 4,
    },
    emptyBody: {
        fontSize: 13,
        color: colors.textMuted,
        lineHeight: 18,
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
    recentBy: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.textSubtle,
    },
});
