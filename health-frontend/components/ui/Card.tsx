import { View, ViewProps, StyleSheet } from 'react-native';
import { colors, radius, space } from '../../theme';

type Props = ViewProps & {
    elevated?: boolean;
    padded?: boolean;
};

export default function Card({
    style,
    elevated,
    padded = true,
    children,
    ...rest
}: Props) {
    return (
        <View
            {...rest}
            style={[
                styles.base,
                padded && styles.padded,
                elevated && styles.elevated,
                style,
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    padded: { padding: space.lg },
    elevated: {
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
});
