import { useCallback, useState } from 'react';
import {
    FlatList,
    Modal,
    Pressable,
    RefreshControl,
    StyleSheet,
    View,
    Alert,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import {
    Button,
    Card,
    Chip,
    EmptyState,
    Icon,
    Input as TextField,
    Screen,
    Text,
} from '../../components/ui';
import {
    listInputs,
    createInput,
    adjustStock,
} from '../../lib/farmers';
import { ApiError } from '../../lib/api';
import { Input, InputCategory } from '../../lib/types';
import { colors, radius, space } from '../../theme';

const CATEGORIES: InputCategory[] = [
    'Fertilizer',
    'Seed',
    'Herbicide',
    'Pesticide',
    'Tool',
    'Other',
];

export default function InputsScreen() {
    const [items, setItems] = useState<Input[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [creating, setCreating] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState<InputCategory>('Fertilizer');
    const [unit, setUnit] = useState('');
    const [stock, setStock] = useState('0');
    const [submitting, setSubmitting] = useState(false);

    const load = useCallback(async () => {
        const d = await listInputs();
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

    const onCreate = async () => {
        if (!name.trim() || !unit.trim()) {
            Alert.alert('Missing', 'Name and unit are required');
            return;
        }
        setSubmitting(true);
        try {
            await createInput({
                name,
                category,
                unit,
                stock: Number(stock) || 0,
            });
            setCreating(false);
            setName('');
            setUnit('');
            setStock('0');
            await load();
        } catch (e) {
            Alert.alert(
                'Failed',
                e instanceof ApiError ? e.message : 'Could not create'
            );
        } finally {
            setSubmitting(false);
        }
    };

    const onAdjust = (input: Input) => {
        Alert.prompt?.(
            'Adjust stock',
            `Enter a delta (positive to add, negative to remove). Current: ${input.stock} ${input.unit}`,
            async (text) => {
                const delta = Number(text);
                if (!delta) return;
                try {
                    await adjustStock(input._id, delta);
                    await load();
                } catch (e) {
                    Alert.alert(
                        'Failed',
                        e instanceof ApiError ? e.message : 'Could not adjust'
                    );
                }
            }
        );
    };

    return (
        <Screen>
            <View style={styles.header}>
                <View style={{ flex: 1 }}>
                    <Text variant="caption" tone="muted">
                        INVENTORY
                    </Text>
                    <Text variant="title" style={{ marginTop: 2 }}>
                        Input catalog
                    </Text>
                </View>
                <Pressable
                    onPress={() => setCreating(true)}
                    style={({ pressed }) => [
                        styles.addBtn,
                        pressed && { opacity: 0.7 },
                    ]}
                    hitSlop={8}
                >
                    <Icon name="plus" size={22} color={colors.surface} />
                </Pressable>
            </View>

            <FlatList
                data={items}
                keyExtractor={(i) => i._id}
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
                        icon="cube"
                        title="No inputs yet"
                        subtitle="Tap + to add an input."
                    />
                }
                renderItem={({ item }) => (
                    <Pressable onPress={() => onAdjust(item)}>
                        {({ pressed }) => (
                            <Card
                                style={[
                                    styles.row,
                                    pressed && { backgroundColor: colors.surfaceMuted },
                                ]}
                            >
                                <View style={{ flex: 1 }}>
                                    <Text variant="bodyStrong">{item.name}</Text>
                                    <Text
                                        variant="caption"
                                        tone="muted"
                                        style={{ marginTop: 2 }}
                                    >
                                        {item.category} · per {item.unit}
                                    </Text>
                                </View>
                                <View style={styles.stock}>
                                    <Text variant="heading">{item.stock}</Text>
                                    <Text variant="caption" tone="muted">
                                        {item.unit}
                                    </Text>
                                </View>
                            </Card>
                        )}
                    </Pressable>
                )}
            />

            <Modal visible={creating} animationType="slide" transparent>
                <View style={styles.modalBg}>
                    <View style={styles.modal}>
                        <View style={styles.modalHandle} />
                        <Text variant="title" style={{ marginBottom: space.lg }}>
                            New input
                        </Text>
                        <TextField
                            label="Name"
                            value={name}
                            onChangeText={setName}
                        />
                        <Text
                            variant="label"
                            tone="muted"
                            style={{ marginBottom: space.sm }}
                        >
                            Category
                        </Text>
                        <View style={styles.chipsRow}>
                            {CATEGORIES.map((c) => (
                                <Chip
                                    key={c}
                                    label={c}
                                    selected={category === c}
                                    onPress={() => setCategory(c)}
                                />
                            ))}
                        </View>
                        <TextField
                            label="Unit"
                            placeholder="kg, bag, litre…"
                            value={unit}
                            onChangeText={setUnit}
                        />
                        <TextField
                            label="Initial stock"
                            value={stock}
                            onChangeText={setStock}
                            keyboardType="numeric"
                        />
                        <View style={{ flexDirection: 'row', gap: space.sm }}>
                            <Button
                                label="Cancel"
                                variant="outline"
                                onPress={() => setCreating(false)}
                                style={{ flex: 1 }}
                            />
                            <Button
                                label="Create"
                                onPress={onCreate}
                                loading={submitting}
                                style={{ flex: 1 }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: space.lg,
        paddingTop: space.lg,
        paddingBottom: space.md,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    addBtn: {
        backgroundColor: colors.text,
        width: 44,
        height: 44,
        borderRadius: radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        paddingHorizontal: space.lg,
        paddingBottom: space['2xl'],
        flexGrow: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.md,
    },
    stock: { alignItems: 'flex-end' },
    modalBg: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'flex-end',
    },
    modal: {
        backgroundColor: colors.surface,
        padding: space.lg,
        paddingTop: space.sm,
        borderTopLeftRadius: radius.xl,
        borderTopRightRadius: radius.xl,
    },
    modalHandle: {
        alignSelf: 'center',
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.border,
        marginBottom: space.md,
    },
    chipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: space.sm,
        marginBottom: space.lg,
    },
});
