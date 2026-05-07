import { Pressable, View, StyleSheet, ViewStyle } from 'react-native';
import { colors, radius, space } from '../../theme';
import Icon from './Icon';
import Text from './Text';
import { IconName } from '../../assets/icons';

type Props = {
    title: string;
    subtitle?: string;
    icon?: IconName;
    onPress?: () => void;
    right?: React.ReactNode;
    showChevron?: boolean;
    style?: ViewStyle;
};

export default function ListItem({
    title,
    subtitle,
    icon,
    onPress,
    right,
    showChevron = !!onPress,
    style,
}: Props) {
    const Wrap: any = onPress ? Pressable : View;
    return (
        <Wrap
            onPress={onPress}
            style={({ pressed }: any) => [
                styles.row,
                pressed && onPress ? styles.pressed : null,
                style,
            ]}
        >
            {icon ? (
                <View style={styles.iconWrap}>
                    <Icon name={icon} size={20} color={colors.text} />
                </View>
            ) : null}
            <View style={styles.body}>
                <Text variant="bodyStrong">{title}</Text>
                {subtitle ? (
                    <Text variant="caption" tone="muted" style={{ marginTop: 2 }}>
                        {subtitle}
                    </Text>
                ) : null}
            </View>
            {right}
            {showChevron ? (
                <Icon name="chevron-right" size={18} color={colors.textSubtle} />
            ) : null}
        </Wrap>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.md,
        paddingVertical: space.md + 2,
        paddingHorizontal: space.lg,
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
    },
    pressed: { backgroundColor: colors.surfaceMuted },
    iconWrap: {
        width: 40,
        height: 40,
        borderRadius: radius.md,
        backgroundColor: colors.surfaceMuted,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: { flex: 1 },
});
