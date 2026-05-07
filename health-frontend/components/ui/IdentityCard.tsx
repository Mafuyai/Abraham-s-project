import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Defs, G, Path, Pattern, Rect } from 'react-native-svg';
import { palette, radius } from '../../theme';

interface Props {
    role: string;
    name: string;
    email: string;
    id: string;
    status?: string;
    rows?: { label: string; value?: string }[];
}

export default function IdentityCard({
    role,
    name,
    email,
    id,
    status = 'ACTIVE',
    rows = [],
}: Props) {
    const monogram = (name || '?').trim().charAt(0).toUpperCase() || '?';
    const shortId = (id || '').slice(-8).toUpperCase();

    return (
        <View style={styles.card}>
            {/* Holographic foil pattern at top */}
            <View style={styles.foil}>
                <Svg
                    width="100%"
                    height={28}
                    viewBox="0 0 320 28"
                    preserveAspectRatio="none"
                >
                    <Defs>
                        <Pattern
                            id="hatch"
                            patternUnits="userSpaceOnUse"
                            width="6"
                            height="6"
                            patternTransform="rotate(35)"
                        >
                            <Rect width="6" height="6" fill="#1A6B3A" />
                            <Path
                                d="M0 0 L0 6"
                                stroke="rgba(255,255,255,0.18)"
                                strokeWidth="1"
                            />
                        </Pattern>
                    </Defs>
                    <Rect width="320" height="28" fill="url(#hatch)" />
                </Svg>
            </View>

            {/* Top meta row */}
            <View style={styles.topRow}>
                <Text style={styles.brand}>PROJECT AB</Text>
                <View style={styles.statusPill}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>{status}</Text>
                </View>
            </View>

            {/* Identity */}
            <View style={styles.identity}>
                <View style={styles.monogramWrap}>
                    <Text style={styles.monogram}>{monogram}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                    <Text style={styles.role}>{role.toUpperCase()}</Text>
                    <Text style={styles.name} numberOfLines={1}>
                        {name}
                    </Text>
                    <Text style={styles.email} numberOfLines={1}>
                        {email}
                    </Text>
                </View>
            </View>

            {/* Extra rows (region, staff ID, etc.) */}
            {rows.length > 0 ? (
                <View style={styles.rows}>
                    {rows
                        .filter((r) => !!r.value)
                        .map((r) => (
                            <View key={r.label} style={styles.rowItem}>
                                <Text style={styles.rowLabel}>
                                    {r.label.toUpperCase()}
                                </Text>
                                <Text style={styles.rowValue}>{r.value}</Text>
                            </View>
                        ))}
                </View>
            ) : null}

            {/* Bottom: ID number like a card */}
            <View style={styles.idRow}>
                <Text style={styles.idLabel}>ID</Text>
                <Text style={styles.idValue}>{shortId}</Text>
            </View>

            {/* Decorative chip + waves */}
            <View style={styles.chipWrap} pointerEvents="none">
                <Svg width={56} height={56} viewBox="0 0 56 56" fill="none">
                    {/* RFID waves */}
                    <G stroke="rgba(255,255,255,0.55)" fill="none">
                        <Circle cx="44" cy="12" r="4" strokeWidth="1.2" />
                        <Path d="M40 12 Q 40 4, 48 4" strokeWidth="1.2" strokeLinecap="round" />
                        <Path d="M36 12 Q 36 0, 52 0" strokeWidth="1.2" strokeLinecap="round" />
                    </G>
                    {/* Chip */}
                    <Rect
                        x="6"
                        y="30"
                        width="22"
                        height="18"
                        rx="3"
                        fill="rgba(255,255,255,0.18)"
                        stroke="rgba(255,255,255,0.55)"
                        strokeWidth="1"
                    />
                    <Path
                        d="M11 35 H 23 M11 39 H 23 M11 43 H 23"
                        stroke="rgba(255,255,255,0.55)"
                        strokeWidth="0.8"
                    />
                </Svg>
            </View>
        </View>
    );
}

const CARD_HEIGHT = 220;

const styles = StyleSheet.create({
    card: {
        height: CARD_HEIGHT,
        borderRadius: 22,
        backgroundColor: palette.brand,
        padding: 20,
        overflow: 'hidden',
        shadowColor: palette.brand,
        shadowOpacity: 0.25,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 8,
    },
    foil: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        opacity: 0.55,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6,
    },
    brand: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 2,
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: radius.pill,
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#A6F4B6',
    },
    statusText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.2,
    },
    identity: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 18,
    },
    monogramWrap: {
        width: 56,
        height: 56,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(255,255,255,0.35)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    monogram: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    role: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.6,
        marginBottom: 4,
    },
    name: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: -0.4,
        marginBottom: 2,
    },
    email: {
        color: 'rgba(255,255,255,0.75)',
        fontSize: 13,
    },
    rows: {
        marginTop: 14,
        flexDirection: 'row',
        gap: 16,
        flexWrap: 'wrap',
    },
    rowItem: {},
    rowLabel: {
        color: 'rgba(255,255,255,0.55)',
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 1.4,
        marginBottom: 2,
    },
    rowValue: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '600',
    },
    idRow: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 18,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    idLabel: {
        color: 'rgba(255,255,255,0.55)',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.6,
    },
    idValue: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 3,
        fontFamily: 'Menlo',
    },
    chipWrap: {
        position: 'absolute',
        right: 16,
        bottom: 14,
        opacity: 0.85,
    },
});
