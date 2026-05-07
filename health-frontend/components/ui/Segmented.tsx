import { Pressable, View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, space } from '../../theme';
import Text from './Text';

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
    value: T | '';
    options: Option<T>[];
    onChange: (v: T) => void;
    style?: ViewStyle;
};

export default function Segmented<T extends string>({
    value,
    options,
    onChange,
    style,
}: Props<T>) {
    return (
        <View style={[styles.wrap, style]}>
            {options.map((opt) => {
                const active = value === opt.value;
                return (
                    <Pressable
                        key={opt.value}
                        onPress={() => onChange(opt.value)}
                        style={[styles.cell, active && styles.cellActive]}
                    >
                        <Text
                            variant="callout"
                            style={{
                                color: active ? colors.surface : colors.text,
                                fontWeight: active ? '600' : '500',
                            }}
                        >
                            {opt.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        flexDirection: 'row',
        backgroundColor: colors.surfaceMuted,
        borderRadius: radius.md,
        padding: 4,
        gap: 4,
    },
    cell: {
        flex: 1,
        paddingVertical: space.sm + 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: radius.sm,
    },
    cellActive: {
        backgroundColor: colors.text,
    },
});
