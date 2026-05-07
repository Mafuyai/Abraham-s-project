import { useRef } from 'react';
import { Animated, Pressable, Text } from 'react-native';
import { colors } from '../../theme';

export default function PrimaryButton({
    label,
    onPress,
}: {
    label: string;
    onPress?: () => void;
}) {
    const scale = useRef(new Animated.Value(1)).current;
    const opacity = useRef(new Animated.Value(1)).current;

    const animateTo = (s: number, o: number) => {
        Animated.parallel([
            Animated.timing(scale, {
                toValue: s,
                duration: 120,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: o,
                duration: 120,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <Pressable
            onPress={onPress}
            onPressIn={() => animateTo(0.94, 0.7)}
            onPressOut={() => animateTo(1, 1)}
            hitSlop={16}
            style={{ alignSelf: 'flex-start' }}
        >
            <Animated.View style={{ transform: [{ scale }], opacity }}>
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: '700',
                        letterSpacing: 0.3,
                        color: colors.text,
                        includeFontPadding: false,
                    }}
                >
                    {label}
                </Text>
            </Animated.View>
        </Pressable>
    );
}
