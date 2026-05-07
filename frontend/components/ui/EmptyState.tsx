import { View, StyleSheet } from 'react-native';
import { colors, radius, space } from '../../theme';
import Icon from './Icon';
import Text from './Text';
import { IconName } from '../../assets/icons';

type Props = {
    icon?: IconName;
    title: string;
    subtitle?: string;
};

export default function EmptyState({
    icon = 'inbox',
    title,
    subtitle,
}: Props) {
    return (
        <View style={styles.wrap}>
            <View style={styles.iconWrap}>
                <Icon name={icon} size={26} color={colors.textSubtle} />
            </View>
            <Text variant="bodyStrong" style={{ textAlign: 'center' }}>
                {title}
            </Text>
            {subtitle ? (
                <Text
                    variant="caption"
                    tone="muted"
                    style={{ textAlign: 'center' }}
                >
                    {subtitle}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: {
        alignItems: 'center',
        paddingVertical: space['3xl'],
        gap: space.sm + 2,
    },
    iconWrap: {
        width: 56,
        height: 56,
        borderRadius: radius.pill,
        backgroundColor: colors.surfaceMuted,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: space.xs,
    },
});
