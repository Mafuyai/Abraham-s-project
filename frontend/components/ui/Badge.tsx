import { View, StyleSheet } from 'react-native';
import { colors, radius, space } from '../../theme';
import Text from './Text';

type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'primary';

type Props = {
    label: string;
    tone?: Tone;
};

const tones: Record<Tone, { bg: string; fg: string }> = {
    neutral: { bg: colors.surfaceMuted, fg: colors.text },
    primary: { bg: colors.primarySoft, fg: colors.primary },
    success: { bg: colors.primarySoft, fg: colors.success },
    warning: { bg: '#FFF4E5', fg: colors.warning },
    danger: { bg: colors.dangerSoft, fg: colors.danger },
};

export default function Badge({ label, tone = 'neutral' }: Props) {
    const t = tones[tone];
    return (
        <View style={[styles.base, { backgroundColor: t.bg }]}>
            <Text
                variant="caption"
                style={{ color: t.fg, fontWeight: '600' }}
            >
                {label}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        alignSelf: 'flex-start',
        paddingHorizontal: space.sm + 2,
        paddingVertical: 4,
        borderRadius: radius.pill,
    },
});
