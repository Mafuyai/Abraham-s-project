import { useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import { colors, layout, radius, space } from '../../theme';
import Text from './Text';
import Icon from './Icon';
import { IconName } from '../../assets/icons';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type Props = {
    label: string;
    onPress: () => void;
    variant?: Variant;
    size?: Size;
    icon?: IconName;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    style?: ViewStyle;
};

const heights: Record<Size, number> = {
    sm: 40,
    md: 48,
    lg: layout.buttonHeight,
};
const fontSize: Record<Size, number> = { sm: 14, md: 15, lg: 16 };

const bgFor = (variant: Variant, pressed: boolean): string => {
    switch (variant) {
        case 'primary':
            return pressed ? colors.primaryPressed : colors.primary;
        case 'secondary':
            return pressed ? '#ECECEC' : colors.surfaceMuted;
        case 'danger':
            return pressed ? '#B71D32' : colors.danger;
        case 'outline':
            return pressed ? colors.surfaceMuted : 'transparent';
        case 'ghost':
            return pressed ? colors.surfaceMuted : 'transparent';
    }
};

const fgFor = (variant: Variant): string => {
    if (variant === 'primary' || variant === 'danger') return colors.textInverse;
    return colors.text;
};

export default function Button({
    label,
    onPress,
    variant = 'primary',
    size = 'lg',
    icon,
    iconPosition = 'left',
    loading,
    disabled,
    fullWidth = true,
    style,
}: Props) {
    const isDisabled = disabled || loading;
    const [pressed, setPressed] = useState(false);

    const fg = fgFor(variant);
    const bg = bgFor(variant, pressed);

    return (
        <Pressable
            onPress={onPress}
            disabled={isDisabled}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            style={[fullWidth ? { width: '100%' } : null, style]}
        >
            <View
                style={[
                    styles.base,
                    {
                        height: heights[size],
                        backgroundColor: bg,
                        opacity: isDisabled ? 0.5 : 1,
                        borderWidth: variant === 'outline' ? 1 : 0,
                        borderColor: colors.border,
                    },
                ]}
            >
                {loading ? (
                    <ActivityIndicator color={fg} size="small" />
                ) : (
                    <View style={styles.content}>
                        {icon && iconPosition === 'left' ? (
                            <Icon
                                name={icon}
                                size={18}
                                color={fg}
                                strokeWidth={2}
                            />
                        ) : null}
                        <Text
                            variant="callout"
                            style={{
                                color: fg,
                                fontSize: fontSize[size],
                                fontWeight: '600',
                            }}
                        >
                            {label}
                        </Text>
                        {icon && iconPosition === 'right' ? (
                            <Icon
                                name={icon}
                                size={18}
                                color={fg}
                                strokeWidth={2}
                            />
                        ) : null}
                    </View>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    base: {
        borderRadius: radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: space.lg,
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: space.sm,
    },
});
