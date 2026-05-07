import { useState } from 'react';
import {
    View,
    TextInput,
    TextInputProps,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { colors, layout, radius, space, type } from '../../theme';
import Text from './Text';

type Props = TextInputProps & {
    label?: string;
    error?: string;
    hint?: string;
    containerStyle?: ViewStyle;
};

export default function Input({
    label,
    error,
    hint,
    style,
    containerStyle,
    onFocus,
    onBlur,
    ...rest
}: Props) {
    const [focused, setFocused] = useState(false);

    return (
        <View style={[styles.group, containerStyle]}>
            {label ? (
                <Text variant="label" tone="muted" style={styles.label}>
                    {label}
                </Text>
            ) : null}
            <TextInput
                {...rest}
                onFocus={(e) => {
                    setFocused(true);
                    onFocus?.(e);
                }}
                onBlur={(e) => {
                    setFocused(false);
                    onBlur?.(e);
                }}
                placeholderTextColor={colors.textSubtle}
                style={[
                    styles.input,
                    focused && styles.focused,
                    error ? styles.error : null,
                    style,
                ]}
            />
            {error ? (
                <Text variant="caption" tone="danger" style={styles.helper}>
                    {error}
                </Text>
            ) : hint ? (
                <Text variant="caption" tone="subtle" style={styles.helper}>
                    {hint}
                </Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    group: { marginBottom: space.lg },
    label: { marginBottom: space.xs + 2 },
    input: {
        height: layout.fieldHeight,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        borderRadius: radius.md,
        paddingHorizontal: space.lg,
        ...type.body,
        color: colors.text,
    },
    focused: { borderColor: colors.text },
    error: { borderColor: colors.danger },
    helper: { marginTop: space.xs + 2 },
});
