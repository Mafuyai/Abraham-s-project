import { View, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors, layout, space } from '../../theme';
import Icon from './Icon';
import Text from './Text';

type Props = {
    title?: string;
    showBack?: boolean;
    onBack?: () => void;
    right?: React.ReactNode;
};

export default function AppBar({ title, showBack, onBack, right }: Props) {
    return (
        <View style={styles.bar}>
            <View style={styles.side}>
                {showBack ? (
                    <Pressable
                        onPress={onBack ?? (() => router.back())}
                        hitSlop={12}
                        style={({ pressed }) => [
                            styles.iconBtn,
                            pressed && { opacity: 0.6 },
                        ]}
                    >
                        <Icon name="arrow-left" size={22} color={colors.text} />
                    </Pressable>
                ) : null}
            </View>
            <View style={styles.center}>
                {title ? (
                    <Text variant="bodyStrong" numberOfLines={1}>
                        {title}
                    </Text>
                ) : null}
            </View>
            <View style={[styles.side, { alignItems: 'flex-end' }]}>{right}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: space.md,
        backgroundColor: colors.bg,
    },
    side: { width: 56, justifyContent: 'center' },
    center: { flex: 1, alignItems: 'center' },
    iconBtn: {
        width: layout.iconButton,
        height: layout.iconButton,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
