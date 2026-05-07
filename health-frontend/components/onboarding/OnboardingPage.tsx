import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Text, View, useWindowDimensions } from 'react-native';
import { colors } from '../../theme';

interface Props {
    isActive: boolean;
    illustration: ReactNode;
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    body: string;
}

const useEnter = ({
    active,
    fromY = 18,
    duration = 500,
    delay = 0,
}: {
    active: boolean;
    fromY?: number;
    duration?: number;
    delay?: number;
}) => {
    const opacity = useRef(new Animated.Value(active ? 1 : 0)).current;
    const translateY = useRef(new Animated.Value(active ? 0 : fromY)).current;

    useEffect(() => {
        if (active) {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration,
                    delay,
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: 0,
                    duration,
                    delay,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            opacity.setValue(0);
            translateY.setValue(fromY);
        }
    }, [active, opacity, translateY, fromY, duration, delay]);

    return { opacity, translateY };
};

export default function OnboardingPage({
    isActive,
    illustration,
    eyebrow,
    titleLead,
    titleAccent,
    body,
}: Props) {
    const { width } = useWindowDimensions();

    const illo = useEnter({ active: isActive, fromY: 24, duration: 540 });
    const copy = useEnter({
        active: isActive,
        fromY: 14,
        duration: 480,
        delay: 120,
    });

    return (
        <View style={{ width, alignItems: 'center', paddingHorizontal: 28 }}>
            <Animated.View
                style={{
                    width: 280,
                    height: 280,
                    marginTop: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: illo.opacity,
                    transform: [{ translateY: illo.translateY }],
                }}
            >
                {illustration}
            </Animated.View>

            <Animated.View
                style={{
                    marginTop: 36,
                    alignSelf: 'stretch',
                    gap: 14,
                    opacity: copy.opacity,
                    transform: [{ translateY: copy.translateY }],
                }}
            >
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: '600',
                        letterSpacing: 2.4,
                        color: colors.primary,
                        textTransform: 'uppercase',
                        includeFontPadding: false,
                    }}
                >
                    {eyebrow}
                </Text>
                <Text
                    style={{
                        fontSize: 36,
                        lineHeight: 40,
                        color: colors.text,
                        letterSpacing: -0.5,
                    }}
                >
                    <Text style={{ fontWeight: '400' }}>{titleLead} </Text>
                    <Text style={{ fontWeight: '700' }}>{titleAccent}</Text>
                </Text>
                <Text
                    style={{
                        fontSize: 15,
                        lineHeight: 22,
                        color: colors.textMuted,
                        marginTop: 4,
                    }}
                >
                    {body}
                </Text>
            </Animated.View>
        </View>
    );
}
