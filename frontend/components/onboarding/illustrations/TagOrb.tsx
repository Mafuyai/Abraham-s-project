import Svg, {
    Circle,
    Defs,
    G,
    LinearGradient,
    Path,
    Rect,
    Stop,
} from 'react-native-svg';
import { colors, palette } from '../../../theme';

export default function TagOrb() {
    return (
        <Svg width={260} height={260} viewBox="0 0 260 260" fill="none">
            <Defs>
                <LinearGradient id="orbBg" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor={palette.brandSoft} />
                    <Stop offset="1" stopColor="#FFFFFF" />
                </LinearGradient>
            </Defs>
            <Circle cx="130" cy="130" r="120" fill="url(#orbBg)" />
            <Circle
                cx="130"
                cy="130"
                r="120"
                stroke={colors.borderStrong}
                strokeWidth="1"
                opacity="0.4"
            />

            {/* RFID waves */}
            <G stroke={colors.primary} strokeLinecap="round" fill="none">
                <Path d="M50 130 Q 70 100, 90 130" strokeWidth="2" opacity="0.3" />
                <Path d="M40 130 Q 65 90, 90 130" strokeWidth="2" opacity="0.5" />
                <Path d="M30 130 Q 60 80, 90 130" strokeWidth="2" opacity="0.7" />
                <Path d="M170 130 Q 190 100, 210 130" strokeWidth="2" opacity="0.3" />
                <Path d="M170 130 Q 195 90, 220 130" strokeWidth="2" opacity="0.5" />
                <Path d="M170 130 Q 200 80, 230 130" strokeWidth="2" opacity="0.7" />
            </G>

            {/* Card */}
            <G transform="rotate(-8 130 130)">
                <Rect
                    x="80"
                    y="100"
                    width="100"
                    height="64"
                    rx="10"
                    fill={colors.surface}
                    stroke={colors.text}
                    strokeWidth="1.5"
                />
                <Circle cx="100" cy="118" r="5" fill={colors.primary} />
                <Rect
                    x="113"
                    y="114"
                    width="56"
                    height="3"
                    rx="1.5"
                    fill={colors.textSubtle}
                />
                <Rect
                    x="113"
                    y="122"
                    width="40"
                    height="3"
                    rx="1.5"
                    fill={colors.borderStrong}
                />
                <Rect
                    x="92"
                    y="138"
                    width="76"
                    height="14"
                    rx="3"
                    fill={palette.brandSoft}
                />
                <Path
                    d="M99 145 L102 148 L107 142"
                    stroke={colors.primary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </G>

            {/* Leaf accent */}
            <G transform="translate(168 70)">
                <Path
                    d="M0 22 Q 0 0, 22 0 Q 22 22, 0 22 Z"
                    fill={colors.primary}
                />
                <Path
                    d="M3 19 L 18 4"
                    stroke={colors.surface}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                />
            </G>
        </Svg>
    );
}
