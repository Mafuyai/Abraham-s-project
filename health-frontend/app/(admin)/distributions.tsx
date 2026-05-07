import { useCallback, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import {
    Card,
    EmptyState,
    Screen,
    Text,
} from '../../components/ui';
import { listDistributions } from '../../lib/farmers';
import { Distribution, Farmer, Input } from '../../lib/types';
import { colors, space } from '../../theme';

export default function DistributionsScreen() {
    const [items, setItems] = useState<Distribution[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const load = useCallback(async () => {
        const d = await listDistributions({ limit: 100 });
        setItems(d.items);
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

    return (
        <Screen>
            <View style={styles.header}>
                <Text variant="caption" tone="muted">
                    ACTIVITY
                </Text>
                <Text variant="title" style={{ marginTop: 2 }}>
                    Distribution log
                </Text>
            </View>
            <FlatList
                data={items}
                keyExtractor={(d) => d._id}
                contentContainerStyle={styles.list}
                ItemSeparatorComponent={() => <View style={{ height: space.md }} />}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.text}
                    />
                }
                ListEmptyComponent={
                    <EmptyState
                        icon="list"
                        title="No distributions yet"
                        subtitle="Officer activity will appear here."
                    />
                }
                renderItem={({ item }) => {
                    const farmer = item.farmer as Farmer;
                    const date = new Date(item.createdAt);
                    return (
                        <Card>
                            <View style={styles.row}>
                                <Text variant="bodyStrong">
                                    {farmer?.fullName ?? 'Farmer'}
                                </Text>
                                <Text variant="caption" tone="subtle">
                                    {date.toLocaleDateString()}
                                </Text>
                            </View>
                            <Text
                                variant="caption"
                                tone="muted"
                                style={{ marginTop: 2 }}
                            >
                                {item.rfidTag} · by{' '}
                                {item.officer?.name ?? 'Officer'}
                            </Text>
                            <View style={{ marginTop: space.sm }}>
                                {item.items.map((l, idx) => {
                                    const inp = l.input as Input;
                                    return (
                                        <Text
                                            key={idx}
                                            variant="callout"
                                            style={{ marginTop: 4 }}
                                        >
                                            {inp?.name ?? 'Input'} ×{' '}
                                            <Text variant="bodyStrong">
                                                {l.quantity} {inp?.unit ?? ''}
                                            </Text>
                                        </Text>
                                    );
                                })}
                            </View>
                        </Card>
                    );
                }}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: space.lg,
        paddingTop: space.lg,
        paddingBottom: space.md,
    },
    list: {
        paddingHorizontal: space.lg,
        paddingBottom: space['2xl'],
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
