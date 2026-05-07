import { useCallback, useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    View,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import {
    Avatar,
    Badge,
    Card,
    EmptyState,
    Screen,
    Text,
} from '../../components/ui';
import { apiGet } from '../../lib/api';
import { colors, space } from '../../theme';

type Officer = {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    region?: string;
    staffId?: string;
    isVerified: boolean;
};

export default function OfficersScreen() {
    const [items, setItems] = useState<Officer[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const load = useCallback(async () => {
        const d = await apiGet<{ items: Officer[] }>('/officers');
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
                    PEOPLE
                </Text>
                <Text variant="title" style={{ marginTop: 2 }}>
                    Field officers
                </Text>
            </View>
            <FlatList
                data={items}
                keyExtractor={(o) => o._id}
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
                        icon="people"
                        title="No officers yet"
                        subtitle="Officers will appear here once they sign up."
                    />
                }
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <View style={styles.rowTop}>
                            <Avatar name={item.name} />
                            <View style={{ flex: 1 }}>
                                <Text variant="bodyStrong">{item.name}</Text>
                                <Text
                                    variant="caption"
                                    tone="muted"
                                    style={{ marginTop: 2 }}
                                >
                                    {item.email}
                                </Text>
                            </View>
                            <Badge
                                label={item.isVerified ? 'Verified' : 'Pending'}
                                tone={item.isVerified ? 'success' : 'warning'}
                            />
                        </View>
                        {(item.region || item.staffId) ? (
                            <View style={styles.metaRow}>
                                {item.region ? (
                                    <Text variant="caption" tone="muted">
                                        {item.region}
                                    </Text>
                                ) : null}
                                {item.staffId ? (
                                    <Text variant="caption" tone="muted">
                                        ID {item.staffId}
                                    </Text>
                                ) : null}
                            </View>
                        ) : null}
                    </Card>
                )}
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
    card: { gap: space.md },
    rowTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.md,
    },
    metaRow: {
        flexDirection: 'row',
        gap: space.md,
        paddingTop: space.sm,
        borderTopWidth: 1,
        borderTopColor: colors.divider,
    },
});
