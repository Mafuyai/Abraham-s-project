import Svg, {
    Circle,
    Defs,
    LinearGradient,
    Path,
    Rect,
    Stop,
    G,
} from 'react-native-svg';
import { colors, palette } from '../../../theme';

export default function ScanRings() {
    return (
        <Svg width={260} height={260} viewBox="0 0 260 260" fill="none">
            <Defs>
                <LinearGradient id="ringBg" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={palette.brandSoft} />
                    <Stop offset="1" stopColor="#FFFFFF" />
                </LinearGradient>
            </Defs>

            <Circle cx="130" cy="130" r="120" fill="url(#ringBg)" />
            <Circle
                cx="130"
                cy="130"
                r="120"
                stroke={colors.borderStrong}
                strokeWidth="1"
                opacity="0.4"
            />

            {/* Concentric scan rings around tag */}
            <Circle
                cx="180"
                cy="130"
                r="74"
                stroke={colors.primary}
                strokeWidth="1"
                opacity="0.18"
                fill="none"
            />
            <Circle
                cx="180"
                cy="130"
                r="56"
                stroke={colors.primary}
                strokeWidth="1.2"
                opacity="0.3"
                fill="none"
            />
            <Circle
                cx="180"
                cy="130"
                r="38"
                stroke={colors.primary}
                strokeWidth="1.4"
                opacity="0.55"
                fill="none"
            />

            {/* Tag dot */}
            <Circle cx="180" cy="130" r="8" fill={colors.primary} />

            {/* Phone */}
            <G>
                <Rect
                    x="62"
                    y="68"
                    width="80"
                    height="140"
                    rx="14"
                    fill={colors.surface}
                    stroke={colors.text}
                    strokeWidth="1.5"
                />
                <Rect
                    x="68"
                    y="76"
                    width="68"
                    height="118"
                    rx="8"
                    fill={palette.ink02}
                />
                {/* Speaker */}
                <Rect
                    x="92"
                    y="74"
                    width="20"
                    height="3"
                    rx="1.5"
                    fill={colors.borderStrong}
                />
                {/* On-screen content */}
                <Rect
                    x="78"
                    y="92"
                    width="42"
                    height="6"
                    rx="2"
                    fill={colors.text}
                />
                <Rect
                    x="78"
                    y="104"
                    width="28"
                    height="4"
                    rx="2"
                    fill={colors.textSubtle}
                />
                <Circle
                    cx="102"
                    cy="148"
                    r="22"
                    stroke={colors.primary}
                    strokeWidth="1.5"
                    opacity="0.4"
                    fill="none"
                />
                <Circle
                    cx="102"
                    cy="148"
                    r="14"
                    stroke={colors.primary}
                    strokeWidth="1.5"
                    opacity="0.7"
                    fill="none"
                />
                <Path
                    d="M96 148 L 100 152 L 108 142"
                    stroke={colors.primary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
                <Rect
                    x="78"
                    y="180"
                    width="48"
                    height="4"
                    rx="2"
                    fill={colors.borderStrong}
                />
            </G>
        </Svg>
    );
}
