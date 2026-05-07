import { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors } from '../../theme';

export const GLASS_TAB_BAR_HEIGHT = 56;

export default function GlassTabBar({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) {
    const insets = useSafeAreaInsets();
    const bottomPad = Math.max(insets.bottom, 8);

    return (
        <View style={[styles.bar, { paddingBottom: bottomPad }]}>
            <View style={styles.row}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    if ((options as any).tabBarButton) return null;

                    const focused = state.index === index;
                    const label =
                        (options.tabBarLabel as string) ||
                        options.title ||
                        route.name;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });
                        if (!focused && !event.defaultPrevented) {
                            Haptics.selectionAsync().catch(() => {});
                            navigation.navigate(route.name as never);
                        }
                    };

                    const onLongPress = () =>
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });

                    return (
                        <TabButton
                            key={route.key}
                            label={label}
                            focused={focused}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            renderIcon={(tint) =>
                                options.tabBarIcon
                                    ? options.tabBarIcon({
                                          focused,
                                          color: tint,
                                          size: 22,
                                      })
                                    : null
                            }
                        />
                    );
                })}
            </View>
        </View>
    );
}

function TabButton({
    label,
    focused,
    onPress,
    onLongPress,
    renderIcon,
}: {
    label: string;
    focused: boolean;
    onPress: () => void;
    onLongPress: () => void;
    renderIcon: (tint: string) => React.ReactNode;
}) {
    const scale = useSharedValue(1);

    const handlePressIn = () => {
        scale.value = withSpring(0.88, {
            damping: 14,
            stiffness: 360,
            mass: 0.5,
        });
    };
    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 10,
            stiffness: 300,
            mass: 0.5,
        });
    };

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const tint = focused ? colors.primary : colors.textSubtle;

    return (
        <Pressable
            onPress={onPress}
            onLongPress={onLongPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            hitSlop={6}
            style={styles.tab}
        >
            <Animated.View style={[styles.iconWrap, iconStyle]}>
                {renderIcon(tint)}
            </Animated.View>
            <Text
                numberOfLines={1}
                style={[
                    styles.label,
                    { color: tint },
                    focused && styles.labelFocused,
                ]}
            >
                {label}
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.surface,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.border,
        paddingTop: 8,
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: -2 },
        elevation: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
    },
    iconWrap: {
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 10.5,
        marginTop: 4,
        letterSpacing: 0.2,
        fontWeight: '500',
    },
    labelFocused: {
        fontWeight: '700',
    },
});
