import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import {
    AppBar,
    Avatar,
    Badge,
    Button,
    Card,
    EmptyState,
    Screen,
    Section,
    Text,
} from '../../components/ui';
import { getFarmer, farmerHistory } from '../../lib/farmers';
import { useAuth } from '../../lib/auth';
import { Distribution, Farmer, Input } from '../../lib/types';
import { colors, space } from '../../theme';

export default function FarmerProfile() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const { user } = useAuth();
    const [farmer, setFarmer] = useState<Farmer | null>(null);
    const [history, setHistory] = useState<Distribution[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        if (!id) return;
        const [f, h] = await Promise.all([getFarmer(id), farmerHistory(id)]);
        setFarmer(f.farmer);
        setHistory(h.items);
    }, [id]);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            load()
                .catch(() => {})
                .finally(() => setLoading(false));
        }, [load])
    );

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await load();
        } catch {}
        setRefreshing(false);
    };

    if (loading || !farmer) {
        return (
            <Screen>
                <AppBar showBack />
                <View style={styles.loading}>
                    <ActivityIndicator color={colors.text} />
                </View>
            </Screen>
        );
    }

    const Row = ({ label, value }: { label: string; value?: string | number }) =>
        value ? (
            <View style={styles.row}>
                <Text variant="body" tone="muted">
                    {label}
                </Text>
                <Text variant="bodyStrong">{value}</Text>
            </View>
        ) : null;

    return (
        <Screen>
            <AppBar showBack />
            <ScrollView
                contentContainerStyle={styles.content}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.text}
                    />
                }
            >
                <View style={styles.hero}>
                    <Avatar name={farmer.fullName} size={88} />
                    <Text variant="title" style={{ marginTop: space.md }}>
                        {farmer.fullName}
                    </Text>
                    <View style={styles.tagPill}>
                        <Text variant="mono" tone="primary">
                            RFID · {farmer.rfidTag}
                        </Text>
                    </View>
                    {!farmer.active ? (
                        <View style={{ marginTop: space.sm }}>
                            <Badge label="Inactive" tone="warning" />
                        </View>
                    ) : null}
                </View>

                <Section title="Contact">
                    <Card>
                        <Row label="Phone" value={farmer.phone} />
                        <Row label="Gender" value={farmer.gender} />
                        <Row
                            label="Date of birth"
                            value={
                                farmer.dateOfBirth
                                    ? new Date(
                                          farmer.dateOfBirth
                                      ).toLocaleDateString()
                                    : undefined
                            }
                        />
                        <Row label="National ID" value={farmer.nationalId} />
                    </Card>
                </Section>

                <Section title="Location & farm">
                    <Card>
                        <Row label="State" value={farmer.state} />
                        <Row label="LGA" value={farmer.lga} />
                        <Row label="Community" value={farmer.community} />
                        <Row label="Cooperative" value={farmer.cooperative} />
                        <Row label="Primary crop" value={farmer.primaryCrop} />
                        <Row
                            label="Farm size"
                            value={
                                farmer.farmSizeHectares
                                    ? `${farmer.farmSizeHectares} ha`
                                    : undefined
                            }
                        />
                    </Card>
                </Section>

                {user?.role === 'officer' ? (
                    <Button
                        label="Record distribution"
                        icon="leaf"
                        onPress={() =>
                            router.push({
                                pathname: '/(officer)/distribute',
                                params: {
                                    tag: farmer.rfidTag,
                                    farmerId: farmer._id,
                                },
                            })
                        }
                        style={{ marginBottom: space.xl }}
                    />
                ) : null}

                <Section title="Distribution history">
                    {history.length === 0 ? (
                        <EmptyState
                            icon="clock"
                            title="Nothing yet"
                            subtitle="Recorded distributions will appear here."
                        />
                    ) : (
                        history.map((d) => (
                            <Card key={d._id}>
                                <Text variant="caption" tone="muted">
                                    {new Date(d.createdAt).toLocaleString()}
                                </Text>
                                <View style={{ marginTop: space.sm }}>
                                    {d.items.map((l, idx) => {
                                        const inp = l.input as Input;
                                        return (
                                            <Text
                                                key={idx}
                                                variant="callout"
                                                style={{ marginTop: 4 }}
                                            >
                                                {inp?.name ?? 'Input'} ×{' '}
                                                <Text variant="bodyStrong">
                                                    {l.quantity}{' '}
                                                    {inp?.unit ?? ''}
                                                </Text>
                                            </Text>
                                        );
                                    })}
                                </View>
                            </Card>
                        ))
                    )}
                </Section>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    content: {
        paddingHorizontal: space.lg,
        paddingBottom: space['2xl'],
    },
    hero: {
        alignItems: 'center',
        marginVertical: space.lg,
    },
    tagPill: {
        marginTop: space.sm,
        paddingHorizontal: space.md,
        paddingVertical: 4,
        backgroundColor: colors.primarySoft,
        borderRadius: 999,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: space.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
    },
});
