import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, space } from '../../theme';
import Text from './Text';

type Props = {
    label: string;
    value: string | number;
    style?: ViewStyle;
};

export default function StatCard({ label, value, style }: Props) {
    return (
        <View style={[styles.card, style]}>
            <Text variant="display" style={styles.value}>
                {value}
            </Text>
            <Text variant="caption" tone="muted" style={styles.label}>
                {label.toUpperCase()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        padding: space.lg,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    value: { fontSize: 30, lineHeight: 34 },
    label: { letterSpacing: 0.6, marginTop: space.xs + 2 },
});
