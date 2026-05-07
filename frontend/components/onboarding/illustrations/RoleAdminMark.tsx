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

export default function RoleAdminMark({ size = 140 }: { size?: number }) {
    return (
        <Svg width={size} height={size} viewBox="0 0 140 140" fill="none">
            <Defs>
                <LinearGradient id="raBg" x1="0" y1="0" x2="0" y2="1">
                    <Stop offset="0" stopColor={palette.brandSoft} />
                    <Stop offset="1" stopColor="#FFFFFF" />
                </LinearGradient>
            </Defs>

            <Circle cx="70" cy="70" r="64" fill="url(#raBg)" />
            <Circle
                cx="70"
                cy="70"
                r="64"
                stroke={colors.borderStrong}
                strokeWidth="0.8"
                opacity="0.5"
            />

            {/* Shield */}
            <G transform="translate(46 36)">
                <Path
                    d="M24 0 L 48 8 V 28 Q 48 50, 24 64 Q 0 50, 0 28 V 8 Z"
                    fill={colors.surface}
                    stroke={colors.text}
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                />
                <Path
                    d="M24 6 L 42 12 V 28 Q 42 46, 24 56 Q 6 46, 6 28 V 12 Z"
                    fill={palette.brandSoft}
                    opacity="0.6"
                />
                <Path
                    d="M14 30 L 22 38 L 36 22"
                    stroke={colors.primary}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                />
            </G>

            {/* Floating people pills */}
            <G transform="translate(20 92)">
                <Circle cx="6" cy="6" r="6" fill={colors.text} />
                <Rect
                    x="14"
                    y="3"
                    width="20"
                    height="2"
                    rx="1"
                    fill={colors.text}
                    opacity="0.65"
                />
                <Rect
                    x="14"
                    y="8"
                    width="14"
                    height="2"
                    rx="1"
                    fill={colors.borderStrong}
                />
            </G>

            <G transform="translate(96 102)">
                <Circle cx="5" cy="5" r="5" fill={colors.primary} />
            </G>
        </Svg>
    );
}
