import { View, StyleSheet } from 'react-native';
import { colors, radius } from '../../theme';
import Text from './Text';

type Props = {
    name?: string;
    size?: number;
};

const initials = (n?: string) =>
    (n || '?')
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((s) => s[0]?.toUpperCase())
        .join('');

export default function Avatar({ name, size = 44 }: Props) {
    return (
        <View
            style={[
                styles.base,
                { width: size, height: size, borderRadius: radius.pill },
            ]}
        >
            <Text
                variant="bodyStrong"
                style={{ fontSize: size * 0.36, color: colors.text }}
            >
                {initials(name)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        backgroundColor: colors.surfaceMuted,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
