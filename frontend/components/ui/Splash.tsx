import { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet, Easing } from 'react-native';
import { colors } from '../../theme';
import { Logo } from '../../assets/icons';
import Text from './Text';

type Props = { onDone?: () => void };

export default function Splash({ onDone }: Props) {
    const scale = useRef(new Animated.Value(0.92)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const fade = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.cubic),
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                    easing: Easing.out(Easing.cubic),
                }),
            ]),
            Animated.delay(300),
            Animated.timing(fade, {
                toValue: 0,
                duration: 280,
                useNativeDriver: true,
                easing: Easing.in(Easing.quad),
            }),
        ]).start(() => onDone?.());
    }, [onDone, scale, opacity, fade]);

    return (
        <Animated.View style={[styles.root, { opacity: fade }]} pointerEvents="none">
            <Animated.View
                style={{
                    opacity,
                    transform: [{ scale }],
                    alignItems: 'center',
                }}
            >
                <Logo size={88} color={colors.primary} />
                <Text
                    variant="callout"
                    tone="muted"
                    style={{ marginTop: 18, letterSpacing: 1.5 }}
                >
                    PROJECT AB
                </Text>
            </Animated.View>
            <View style={styles.footer}>
                <Text variant="caption" tone="subtle">
                    RFID · Agriculture
                </Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    root: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
    },
    footer: {
        position: 'absolute',
        bottom: 48,
        alignItems: 'center',
    },
});
