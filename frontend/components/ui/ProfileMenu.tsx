import { Fragment } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import Icon from './Icon';
import PressableCard from './PressableCard';
import { IconName } from '../../assets/icons';
import { colors, palette, radius } from '../../theme';

export interface ProfileMenuItem {
    icon: IconName;
    label: string;
    hint?: string;
    onPress?: () => void;
    tone?: 'default' | 'danger';
}

interface Props {
    items: ProfileMenuItem[];
}

export default function ProfileMenu({ items }: Props) {
    return (
        <View style={styles.group}>
            {items.map((item, i) => (
                <Fragment key={`${item.label}-${i}`}>
                    {i > 0 ? <View style={styles.divider} /> : null}
                    <Row item={item} />
                </Fragment>
            ))}
        </View>
    );
}

function Row({ item }: { item: ProfileMenuItem }) {
    const isDanger = item.tone === 'danger';
    const handlePress = () => {
        Haptics.selectionAsync().catch(() => {});
        item.onPress?.();
    };

    return (
        <PressableCard onPress={handlePress} style={styles.row} haptic={false}>
            <View
                style={[
                    styles.iconWrap,
                    isDanger && { backgroundColor: '#FCEBEE' },
                ]}
            >
                <Icon
                    name={item.icon}
                    size={18}
                    color={isDanger ? colors.danger : colors.primary}
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text
                    style={[
                        styles.label,
                        isDanger && { color: colors.danger },
                    ]}
                >
                    {item.label}
                </Text>
                {item.hint ? (
                    <Text style={styles.hint}>{item.hint}</Text>
                ) : null}
            </View>
            {!isDanger ? (
                <Icon
                    name="chevron-right"
                    size={16}
                    color={colors.textSubtle}
                />
            ) : null}
        </PressableCard>
    );
}

const styles = StyleSheet.create({
    group: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        paddingHorizontal: 14,
    },
    iconWrap: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: palette.brandSoft,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.text,
    },
    hint: {
        fontSize: 12,
        color: colors.textMuted,
        marginTop: 2,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.divider,
        marginLeft: 60,
    },
});
