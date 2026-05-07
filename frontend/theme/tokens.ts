export const palette = {
    ink: '#0A0A0A',
    ink80: '#1F1F1F',
    ink60: '#5C5C5C',
    ink40: '#8E8E93',
    ink20: '#C7C7CC',
    ink10: '#E5E5EA',
    ink05: '#F2F2F2',
    ink02: '#FAFAFA',

    surface: '#FFFFFF',
    canvas: '#FAFAF7',

    brand: '#1A6B3A',
    brandPressed: '#155A30',
    brandSoft: '#EAF3EE',

    accent: '#0A0A0A',

    danger: '#D7263D',
    dangerSoft: '#FCEBEE',
    warning: '#B86E00',
    warningSoft: '#FFF4E5',
    success: '#1A6B3A',

    overlay: 'rgba(10,10,10,0.4)',
};

export const colors = {
    text: palette.ink,
    textMuted: palette.ink60,
    textSubtle: palette.ink40,
    textInverse: '#FFFFFF',

    bg: palette.canvas,
    surface: palette.surface,
    surfaceMuted: palette.ink02,

    border: palette.ink10,
    borderStrong: palette.ink20,
    divider: palette.ink05,

    primary: palette.brand,
    primaryPressed: palette.brandPressed,
    primarySoft: palette.brandSoft,

    danger: palette.danger,
    dangerSoft: palette.dangerSoft,
    warning: palette.warning,
    warningSoft: palette.warningSoft,
    success: palette.success,

    overlay: palette.overlay,
};

export const space = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
    '3xl': 48,
    '4xl': 64,
};

export const radius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    pill: 999,
};

export const type = {
    display: { fontSize: 32, lineHeight: 38, fontWeight: '700' as const, letterSpacing: -0.5 },
    title: { fontSize: 24, lineHeight: 30, fontWeight: '700' as const, letterSpacing: -0.3 },
    heading: { fontSize: 20, lineHeight: 26, fontWeight: '600' as const, letterSpacing: -0.2 },
    body: { fontSize: 16, lineHeight: 22, fontWeight: '400' as const },
    bodyStrong: { fontSize: 16, lineHeight: 22, fontWeight: '600' as const },
    callout: { fontSize: 15, lineHeight: 20, fontWeight: '500' as const },
    label: { fontSize: 13, lineHeight: 18, fontWeight: '500' as const, letterSpacing: 0.1 },
    caption: { fontSize: 12, lineHeight: 16, fontWeight: '500' as const },
    mono: { fontSize: 13, lineHeight: 18, fontFamily: 'Menlo' },
};

export const shadow = {
    none: {},
    sm: {
        shadowColor: '#000',
        shadowOpacity: 0.04,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
    },
    md: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
};

export const layout = {
    screenPadding: space.lg,
    fieldHeight: 52,
    buttonHeight: 52,
    tabBarHeight: 64,
    iconButton: 44,
    hairline: 1,
};
