import { ReactNode } from 'react';
import { Pressable, ViewStyle, StyleProp } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface Props {
    onPress?: () => void;
    haptic?: boolean;
    scaleTo?: number;
    style?: StyleProp<ViewStyle>;
    children: ReactNode;
}

export default function PressableCard({
    onPress,
    haptic = true,
    scaleTo = 0.96,
    style,
    children,
}: Props) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const onPressIn = () => {
        scale.value = withSpring(scaleTo, {
            damping: 18,
            stiffness: 360,
            mass: 0.5,
        });
    };

    const onPressOut = () => {
        scale.value = withSpring(1, {
            damping: 14,
            stiffness: 280,
            mass: 0.6,
        });
    };

    const handlePress = () => {
        if (haptic) {
            Haptics.selectionAsync().catch(() => {});
        }
        onPress?.();
    };

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <Animated.View style={[style, animatedStyle]}>
                {children}
            </Animated.View>
        </Pressable>
    );
}
