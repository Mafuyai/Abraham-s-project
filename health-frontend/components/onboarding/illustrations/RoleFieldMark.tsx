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

export default function RoleFieldMark({ size = 140 }: { size?: number }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 140 140" fill="none">
            <Defs>
                <LinearGradient id="rfBg" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor="#FFFFFF" />
                    <Stop offset="1" stopColor={palette.brandSoft} />
                </LinearGradient>
            </Defs>

            <Circle cx="70" cy="70" r="64" fill="url(#rfBg)" />
            <Circle
                cx="70"
                cy="70"
                r="64"
                stroke={colors.borderStrong}
                strokeWidth="0.8"
                opacity="0.5"
            />

            {/* RFID waves on both sides */}
            <G stroke={colors.primary} strokeLinecap="round" fill="none">
                <Path d="M30 70 Q 38 60, 46 70" strokeWidth="1.2" opacity="0.45" />
                <Path d="M24 70 Q 35 56, 46 70" strokeWidth="1.2" opacity="0.65" />
                <Path d="M94 70 Q 102 60, 110 70" strokeWidth="1.2" opacity="0.45" />
                <Path d="M94 70 Q 105 56, 116 70" strokeWidth="1.2" opacity="0.65" />
            </G>

            {/* Card */}
            <G transform="rotate(-6 70 70)">
                <Rect
                    x="46"
                    y="54"
                    width="48"
                    height="32"
                    rx="5"
                    fill={colors.surface}
                    stroke={colors.text}
                    strokeWidth="1"
                />
                <Circle cx="55" cy="64" r="2.5" fill={colors.primary} />
                <Rect
                    x="61"
                    y="62"
                    width="26"
                    height="1.6"
                    rx="0.8"
                    fill={colors.textSubtle}
                />
                <Rect
                    x="61"
                    y="66"
                    width="18"
                    height="1.4"
                    rx="0.7"
                    fill={colors.borderStrong}
                />
                <Rect
                    x="51"
                    y="73"
                    width="38"
                    height="6"
                    rx="2"
                    fill={palette.brandSoft}
                />
            </G>

            {/* Leaf accent */}
            <G transform="translate(94 38)">
                <Path d="M0 12 Q 0 0, 12 0 Q 12 12, 0 12 Z" fill={colors.primary} />
            </G>
        </Svg>
    );
}
