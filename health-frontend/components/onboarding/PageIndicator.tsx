import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { colors } from '../../theme';

const DOT = 7;
const ACTIVE_W = 26;
const GAP = 6;

function Dot({ active }: { active: boolean }) {
    const widthAnim = useRef(new Animated.Value(active ? ACTIVE_W : DOT)).current;
    const opacityAnim = useRef(new Animated.Value(active ? 1 : 0.35)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(widthAnim, {
                toValue: active ? ACTIVE_W : DOT,
                duration: 320,
                useNativeDriver: false,
            }),
            Animated.timing(opacityAnim, {
                toValue: active ? 1 : 0.3,
                duration: 320,
                useNativeDriver: false,
            }),
        ]).start();
    }, [active, widthAnim, opacityAnim]);

    return (
        <Animated.View
            style={{
                width: widthAnim,
                height: DOT,
                borderRadius: DOT,
                backgroundColor: active ? colors.primary : colors.borderStrong,
                opacity: opacityAnim,
            }}
        />
    );
}

export default function PageIndicator({
    count,
    activeIndex,
}: {
    count: number;
    activeIndex: number;
}) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: GAP }}>
            {Array.from({ length: count }).map((_, i) => (
                <Dot key={i} active={i === activeIndex} />
            ))}
        </View>
    );
}
