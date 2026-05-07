import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps, ICON_DEFAULTS } from './types';

export default function UserPlus({
    size = ICON_DEFAULTS.size,
    color = ICON_DEFAULTS.color,
    strokeWidth = ICON_DEFAULTS.strokeWidth,
}: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle
                cx="9"
                cy="8"
                r="4"
                stroke={color}
                strokeWidth={strokeWidth}
            />
            <Path
                d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M19 8v6M16 11h6"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
