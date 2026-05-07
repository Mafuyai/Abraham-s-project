import { useCallback, useMemo, useState } from 'react';
import {
    FlatList,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Avatar, EmptyState, Screen } from '../../components/ui';
import { listDistributions } from '../../lib/farmers';
import { Distribution, Farmer, Input } from '../../lib/types';
import { useAuth } from '../../lib/auth';
import { colors, palette, radius } from '../../theme';

type Filter = 'all' | 'today' | 'week';

const startOfDay = (d: Date) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
};
const startOfWeek = (d: Date) => {
    const x = startOfDay(d);
    x.setDate(x.getDate() - x.getDay());
    return x;
};

export default function History() {
    const { user } = useAuth();
    const router = useRouter();
    const [items, setItems] = useState<Distribution[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState<Filter>('all');

    const load = useCallback(async () => {
        const d = await listDistributions({ officer: user?.id, limit: 100 });
        setItems(d.items);
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

    const filtered = useMemo(() => {
        if (filter === 'all') return items;
        const now = new Date();
        const cutoff =
            filter === 'today' ? startOfDay(now) : startOfWeek(now);
        return items.filter(
            (i) => new Date(i.createdAt).getTime() >= cutoff.getTime()
        );
    }, [items, filter]);

    const totalLines = useMemo(
        () =>
            filtered.reduce(
                (acc, d) =>
                    acc + d.items.reduce((s, l) => s + (l.quantity || 0), 0),
                0
            ),
        [filtered]
    );

    const setFilterWithHaptic = (f: Filter) => {
        Haptics.selectionAsync().catch(() => {});
        setFilter(f);
    };

    return (
        <Screen>
            <View style={styles.head}>
                <Text style={styles.eyebrow}>YOU</Text>
                <Text style={styles.title}>
                    <Text style={styles.titleLead}>My </Text>
                    <Text style={styles.titleAccent}>distributions.</Text>
                </Text>
                <Text style={styles.summary}>
                    {filtered.length} record
                    {filtered.length === 1 ? '' : 's'} ·{' '}
                    {totalLines} item{totalLines === 1 ? '' : 's'} issued
                </Text>

                {/* Filter chips */}
                <View style={styles.filters}>
                    <FilterChip
                        label="All"
                        active={filter === 'all'}
                        onPress={() => setFilterWithHaptic('all')}
                    />
                    <FilterChip
                        label="This week"
                        active={filter === 'week'}
                        onPress={() => setFilterWithHaptic('week')}
                    />
                    <FilterChip
                        label="Today"
                        active={filter === 'today'}
                        onPress={() => setFilterWithHaptic('today')}
                    />
                </View>
            </View>

            <FlatList
                data={filtered}
                keyExtractor={(d) => d._id}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => (
                    <View style={{ height: 10 }} />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.text}
                    />
                }
                ListEmptyComponent={
                    <EmptyState
                        icon="clock"
                        title="Nothing in this view"
                        subtitle="Records you create will show up here."
                    />
                }
                renderItem={({ item }) => (
                    <DistributionRow
                        item={item}
                        onPress={() => {
                            const farmerId =
                                typeof item.farmer === 'string'
                                    ? item.farmer
                                    : (item.farmer as Farmer)._id;
                            router.push({
                                pathname: '/(farmer)/[id]',
                                params: { id: farmerId },
                            });
                        }}
                    />
                )}
            />
        </Screen>
    );
}

function FilterChip({
    label,
    active,
    onPress,
}: {
    label: string;
    active: boolean;
    onPress: () => void;
}) {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.chip, active && styles.chipActive]}
        >
            <Text
                style={[
                    styles.chipText,
                    active && styles.chipTextActive,
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
}

function DistributionRow({
    item,
    onPress,
}: {
    item: Distribution;
    onPress: () => void;
}) {
    const farmer = item.farmer as Farmer;
    const date = new Date(item.createdAt);
    const dateLabel = date.toLocaleDateString();
    const timeLabel = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <Pressable
            onPress={() => {
                Haptics.selectionAsync().catch(() => {});
                onPress();
            }}
            style={({ pressed }) => [
                styles.row,
                pressed && { opacity: 0.7 },
            ]}
        >
            <View style={styles.rowHeader}>
                <Avatar name={farmer?.fullName} size={36} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.farmer}>
                        {farmer?.fullName ?? 'Farmer'}
                    </Text>
                    <Text style={styles.meta}>
                        {item.rfidTag} · {timeLabel}
                    </Text>
                </View>
                <Text style={styles.date}>{dateLabel}</Text>
            </View>
            <View style={styles.lines}>
                {item.items.map((l, idx) => {
                    const inp = l.input as Input;
                    return (
                        <Text key={idx} style={styles.line}>
                            {inp?.name ?? 'Input'} ·{' '}
                            <Text style={styles.lineQty}>
                                {l.quantity} {inp?.unit ?? ''}
                            </Text>
                        </Text>
                    );
                })}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    head: {
        paddingHorizontal: 24,
        paddingTop: 12,
        paddingBottom: 16,
    },
    eyebrow: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 2.4,
        color: colors.primary,
        marginBottom: 10,
    },
    title: {
        fontSize: 32,
        lineHeight: 36,
        letterSpacing: -0.5,
        color: colors.text,
        marginBottom: 6,
    },
    titleLead: { fontWeight: '400' },
    titleAccent: { fontWeight: '700' },
    summary: {
        fontSize: 13,
        color: colors.textMuted,
        marginBottom: 16,
    },
    filters: {
        flexDirection: 'row',
        gap: 8,
    },
    chip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: radius.pill,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },
    chipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    chipText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.text,
    },
    chipTextActive: {
        color: colors.textInverse,
    },
    list: {
        paddingHorizontal: 24,
        paddingBottom: 140,
    },
    row: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 14,
    },
    rowHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    farmer: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
    },
    meta: {
        fontSize: 12,
        color: colors.textMuted,
        marginTop: 2,
    },
    date: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.textSubtle,
    },
    lines: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.divider,
        gap: 4,
    },
    line: {
        fontSize: 13,
        color: colors.textMuted,
    },
    lineQty: {
        color: colors.text,
        fontWeight: '600',
    },
});
