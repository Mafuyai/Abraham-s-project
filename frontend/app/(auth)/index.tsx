import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Screen, AppBar, PressableCard } from '../../components/ui';
import { Logo } from '../../assets/icons';
import {
    RoleFieldMark,
    RoleAdminMark,
} from '../../components/onboarding';
import { colors, palette, space } from '../../theme';

type Role = 'officer' | 'admin';

interface RoleEntry {
    role: Role;
    number: string;
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    description: string;
    illustration: React.ReactNode;
}

const ROLES: RoleEntry[] = [
    {
        role: 'officer',
        number: '01',
        eyebrow: 'IN THE FIELD',
        titleLead: 'Field',
        titleAccent: 'officer.',
        description:
            'Register farmers, scan tags, and record input distributions on the ground.',
        illustration: <RoleFieldMark size={132} />,
    },
    {
        role: 'admin',
        number: '02',
        eyebrow: 'AT THE PROGRAM',
        titleLead: 'Program',
        titleAccent: 'admin.',
        description:
            'Oversee officers, manage the input catalogue, and review program activity.',
        illustration: <RoleAdminMark size={132} />,
    },
];

export default function ChooseRole() {
    const router = useRouter();

    return (
        <Screen>
            <AppBar />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.brand}>
                    <Logo size={22} color={colors.primary} />
                    <Text style={styles.brandWord}>PROJECT AB</Text>
                </View>

                <View style={styles.hero}>
                    <Text style={styles.eyebrow}>GET STARTED</Text>
                    <Text style={styles.title}>
                        <Text style={styles.titleLead}>Pick your </Text>
                        <Text style={styles.titleAccent}>way in.</Text>
                    </Text>
                    <Text style={styles.lede}>
                        Two ways to use Project AB. Pick the one that matches
                        your work.
                    </Text>
                </View>

                <View style={styles.cards}>
                    {ROLES.map((entry) => (
                        <RoleCard
                            key={entry.role}
                            entry={entry}
                            onPress={() =>
                                router.push({
                                    pathname: '/(auth)/register',
                                    params: { role: entry.role },
                                })
                            }
                        />
                    ))}
                </View>

                <View style={styles.footer}>
                    <View style={styles.footerRule} />
                    <View style={styles.footerRow}>
                        <Text style={styles.footerLabel}>Already with us?</Text>
                        <Link href="/(auth)/login" asChild>
                            <Pressable hitSlop={12}>
                                {({ pressed }) => (
                                    <Text
                                        style={[
                                            styles.signIn,
                                            pressed && { opacity: 0.55 },
                                        ]}
                                    >
                                        Sign in →
                                    </Text>
                                )}
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </Screen>
    );
}

function RoleCard({
    entry,
    onPress,
}: {
    entry: RoleEntry;
    onPress: () => void;
}) {
    return (
        <PressableCard onPress={onPress} style={styles.card} scaleTo={0.97}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardEyebrow}>
                    <Text style={styles.cardEyebrowNum}>{entry.number}</Text>
                    {`   ${entry.eyebrow}`}
                </Text>
                <View style={styles.cardArrow}>
                    <Text style={styles.cardArrowGlyph}>→</Text>
                </View>
            </View>

            <View style={styles.cardBody}>
                <View style={styles.cardText}>
                    <Text style={styles.cardTitle}>
                        <Text style={styles.cardTitleLead}>
                            {entry.titleLead}{' '}
                        </Text>
                        <Text style={styles.cardTitleAccent}>
                            {entry.titleAccent}
                        </Text>
                    </Text>
                    <Text style={styles.cardDesc}>{entry.description}</Text>
                </View>
                <View style={styles.cardIllo}>{entry.illustration}</View>
            </View>
        </PressableCard>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingHorizontal: 28,
        paddingBottom: space['2xl'],
        flexGrow: 1,
    },
    brand: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
        marginBottom: 40,
    },
    brandWord: {
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1.6,
        color: colors.text,
    },
    hero: { marginBottom: 32 },
    eyebrow: {
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 2.4,
        color: colors.primary,
        marginBottom: 16,
    },
    title: {
        fontSize: 40,
        lineHeight: 44,
        letterSpacing: -0.5,
        color: colors.text,
        marginBottom: 12,
    },
    titleLead: { fontWeight: '400' },
    titleAccent: { fontWeight: '700' },
    lede: {
        fontSize: 15,
        lineHeight: 22,
        color: colors.textMuted,
        maxWidth: 320,
    },
    cards: {
        gap: 16,
        marginBottom: 'auto',
    },
    card: {
        backgroundColor: colors.surface,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 22,
        overflow: 'hidden',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    cardEyebrow: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 1.8,
        color: colors.textMuted,
    },
    cardEyebrowNum: {
        color: colors.text,
        fontWeight: '700',
    },
    cardArrow: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: palette.brandSoft,
    },
    cardArrowGlyph: {
        fontSize: 18,
        color: colors.primary,
        fontWeight: '600',
        marginTop: -2,
    },
    cardBody: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    cardText: {
        flex: 1,
        paddingRight: 8,
    },
    cardTitle: {
        fontSize: 30,
        lineHeight: 34,
        letterSpacing: -0.4,
        color: colors.text,
        marginBottom: 8,
        marginTop: 8,
    },
    cardTitleLead: { fontWeight: '400' },
    cardTitleAccent: { fontWeight: '700' },
    cardDesc: {
        fontSize: 13,
        lineHeight: 19,
        color: colors.textMuted,
        maxWidth: 220,
    },
    cardIllo: {
        marginRight: -8,
        marginBottom: -8,
    },
    footer: { marginTop: 32 },
    footerRule: {
        height: 1,
        backgroundColor: colors.divider,
        marginBottom: 20,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerLabel: {
        fontSize: 14,
        color: colors.textMuted,
    },
    signIn: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        letterSpacing: 0.2,
    },
});
