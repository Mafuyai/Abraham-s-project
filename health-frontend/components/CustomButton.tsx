import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

type ButtonStyles = {
    [key: string]: ViewStyle;
};

type TextStyles = {
    [key: string]: TextStyle;
};

interface CustomButtonProps {
    onPress: () => void;
    text: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'small' | 'medium' | 'large';
    icon?: keyof typeof Ionicons.glyphMap;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function CustomButton({
    onPress,
    text,
    variant = 'primary',
    size = 'medium',
    icon,
    iconPosition = 'right',
    loading = false,
    disabled = false,
    style,
    textStyle,
}: CustomButtonProps) {
    const getButtonStyle = () => {
        let variantStyle: ViewStyle;
        switch (variant) {
            case 'secondary':
                variantStyle = styles.button_secondary as ViewStyle;
                break;
            case 'outline':
                variantStyle = styles.button_outline as ViewStyle;
                break;
            case 'danger':
                variantStyle = styles.button_danger as ViewStyle;
                break;
            default:
                variantStyle = styles.button_primary as ViewStyle;
        }

        return [
            styles.button,
            styles[`button_${size}`],
            variantStyle,
            disabled && styles.button_disabled,
            style,
        ];
    };

    const getTextStyle = () => {
        let variantStyle: TextStyle;
        switch (variant) {
            case 'outline':
                variantStyle = styles.text_outline as TextStyle;
                break;
            case 'secondary':
                variantStyle = styles.text_secondary as TextStyle;
                break;
            case 'danger':
                variantStyle = styles.text_danger as TextStyle;
                break;
            default:
                variantStyle = styles.text_primary as TextStyle;
        }

        return [
            styles.text,
            styles[`text_${size}`],
            variantStyle,
            disabled && styles.text_disabled,
            textStyle,
        ];
    };

    const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
    const iconColor =
        variant === 'outline'
            ? '#0D3EED'
            : variant === 'secondary'
              ? '#666'
              : 'white';

    return (
        <TouchableOpacity
            style={getButtonStyle()}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' ? '#0D3EED' : 'white'}
                />
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <Ionicons
                            name={icon}
                            size={iconSize}
                            color={iconColor}
                            style={styles.iconLeft}
                        />
                    )}
                    <Text style={getTextStyle()}>{text}</Text>
                    {icon && iconPosition === 'right' && (
                        <Ionicons
                            name={icon}
                            size={iconSize}
                            color={iconColor}
                            style={styles.iconRight}
                        />
                    )}
                </>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    button_small: {
        padding: 8,
    },
    button_medium: {
        padding: 16,
    },
    button_large: {
        padding: 20,
    },
    button_primary: {
        backgroundColor: '#0D3EED',
    },
    button_secondary: {
        backgroundColor: '#F5F5F5',
    },
    button_outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#0D3EED',
    },
    button_danger: {
        backgroundColor: '#FF3B30',
    },
    button_disabled: {
        opacity: 0.5,
    },
    text: {
        fontWeight: '600',
    },
    text_small: {
        fontSize: 14,
    },
    text_medium: {
        fontSize: 16,
    },
    text_large: {
        fontSize: 18,
    },
    text_primary: {
        color: 'white',
    },
    text_secondary: {
        color: '#333',
    },
    text_outline: {
        color: '#0D3EED',
    },
    text_danger: {
        color: 'white',
    },
    text_disabled: {
        color: '#999',
    },
    iconLeft: {
        marginRight: 8,
    },
    iconRight: {
        marginLeft: 8,
    },
} as const);
