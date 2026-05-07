import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, space } from '../../theme';
import Text from './Text';

type Props = {
    label: string;
    selected?: boolean;
    onPress: () => void;
    style?: ViewStyle;
};

export default function Chip({ label, selected, onPress, style }: Props) {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.chip, selected && styles.chipActive, style]}
        >
            <Text
                variant="callout"
                style={{
                    color: selected ? colors.surface : colors.text,
                    fontWeight: '500',
                }}
            >
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    chip: {
        paddingVertical: space.sm + 2,
        paddingHorizontal: space.lg,
        borderRadius: radius.pill,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
    },
    chipActive: {
        backgroundColor: colors.text,
        borderColor: colors.text,
    },
});
