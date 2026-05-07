import { View, StyleSheet, ViewStyle } from 'react-native';
import { space } from '../../theme';
import Text from './Text';

type Props = {
    title?: string;
    description?: string;
    children: React.ReactNode;
    style?: ViewStyle;
    headerRight?: React.ReactNode;
};

export default function Section({
    title,
    description,
    children,
    style,
    headerRight,
}: Props) {
    return (
        <View style={[styles.wrap, style]}>
            {title || headerRight ? (
                <View style={styles.head}>
                    <View style={{ flex: 1 }}>
                        {title ? <Text variant="heading">{title}</Text> : null}
                        {description ? (
                            <Text
                                variant="caption"
                                tone="muted"
                                style={{ marginTop: 2 }}
                            >
                                {description}
                            </Text>
                        ) : null}
                    </View>
                    {headerRight}
                </View>
            ) : null}
            <View style={{ gap: space.sm + 2 }}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { marginBottom: space.xl, gap: space.md },
    head: { flexDirection: 'row', alignItems: 'center' },
});
