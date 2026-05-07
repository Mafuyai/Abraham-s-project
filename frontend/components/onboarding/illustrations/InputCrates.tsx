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

export default function InputCrates() {
    return (
        <Svg width={260} height={260} viewBox="0 0 260 260" fill="none">
            <Defs>
                <LinearGradient id="crateBg" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor="#FFFFFF" />
                    <Stop offset="1" stopColor={palette.brandSoft} />
                </LinearGradient>
            </Defs>
            <Circle cx="130" cy="130" r="120" fill="url(#crateBg)" />
            <Circle
                cx="130"
                cy="130"
                r="120"
                stroke={colors.borderStrong}
                strokeWidth="1"
                opacity="0.4"
            />

            {/* Back crate (slightly higher, slimmer) */}
            <G transform="translate(70 90)">
                <Rect
                    x="0"
                    y="0"
                    width="86"
                    height="58"
                    rx="6"
                    fill={colors.surface}
                    stroke={colors.text}
                    strokeWidth="1.5"
                />
                <Rect
                    x="6"
                    y="14"
                    width="74"
                    height="2"
                    fill={colors.borderStrong}
                />
                <Rect
                    x="34"
                    y="0"
                    width="18"
                    height="6"
                    fill={colors.borderStrong}
                />
                {/* Seed dots */}
                <Circle cx="22" cy="36" r="4" fill={colors.primary} />
                <Circle cx="36" cy="32" r="4" fill={colors.primary} opacity="0.7" />
                <Circle cx="50" cy="38" r="4" fill={colors.primary} opacity="0.5" />
                <Circle cx="64" cy="34" r="4" fill={colors.primary} opacity="0.7" />
            </G>

            {/* Front crate */}
            <G transform="translate(94 134)">
                <Rect
                    x="0"
                    y="0"
                    width="100"
                    height="68"
                    rx="6"
                    fill={colors.surface}
                    stroke={colors.text}
                    strokeWidth="1.5"
                />
                <Rect
                    x="6"
                    y="16"
                    width="88"
                    height="2"
                    fill={colors.borderStrong}
                />
                <Rect
                    x="40"
                    y="0"
                    width="20"
                    height="8"
                    fill={colors.text}
                />
                {/* Bag of fertilizer with N P K letters */}
                <Path
                    d="M22 28 Q 22 22, 28 22 L 50 22 Q 56 22, 56 28 L 56 56 Q 56 60, 50 60 L 28 60 Q 22 60, 22 56 Z"
                    fill={palette.brandSoft}
                    stroke={colors.primary}
                    strokeWidth="1.2"
                />
                <Rect
                    x="68"
                    y="30"
                    width="22"
                    height="26"
                    rx="3"
                    fill={palette.brandSoft}
                    stroke={colors.primary}
                    strokeWidth="1.2"
                />
                <Path
                    d="M70 38 L 70 50 M70 38 L 76 50 L 76 38"
                    stroke={colors.primary}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                />
                <Path
                    d="M82 38 L 82 50 M82 38 L 86 38 Q 88 38, 88 41 Q 88 44, 86 44 L 82 44"
                    stroke={colors.primary}
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    fill="none"
                />
            </G>

            {/* Floating tag pill */}
            <G transform="translate(160 64)">
                <Rect
                    x="0"
                    y="0"
                    width="58"
                    height="22"
                    rx="11"
                    fill={colors.text}
                />
                <Circle cx="11" cy="11" r="3" fill={colors.primary} />
                <Rect x="20" y="8" width="30" height="2" rx="1" fill="#FFFFFF" />
                <Rect
                    x="20"
                    y="13"
                    width="22"
                    height="2"
                    rx="1"
                    fill="#FFFFFF"
                    opacity="0.6"
                />
            </G>
        </Svg>
    );
}
