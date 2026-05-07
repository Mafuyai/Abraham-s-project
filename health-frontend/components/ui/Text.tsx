import { Text as RNText, TextProps, StyleSheet } from 'react-native';
import { colors, type } from '../../theme';

type Variant =
    | 'display'
    | 'title'
    | 'heading'
    | 'body'
    | 'bodyStrong'
    | 'callout'
    | 'label'
    | 'caption'
    | 'mono';

type Tone = 'default' | 'muted' | 'subtle' | 'inverse' | 'primary' | 'danger';

type Props = TextProps & {
    variant?: Variant;
    tone?: Tone;
};

const tones: Record<Tone, string> = {
    default: colors.text,
    muted: colors.textMuted,
    subtle: colors.textSubtle,
    inverse: colors.textInverse,
    primary: colors.primary,
    danger: colors.danger,
};

export default function Text({
    variant = 'body',
    tone = 'default',
    style,
    ...rest
}: Props) {
    return (
        <RNText
            {...rest}
            style={[styles[variant], { color: tones[tone] }, style]}
        />
    );
}

const styles = StyleSheet.create({
    display: type.display,
    title: type.title,
    heading: type.heading,
    body: type.body,
    bodyStrong: type.bodyStrong,
    callout: type.callout,
    label: type.label,
    caption: type.caption,
    mono: type.mono,
});
