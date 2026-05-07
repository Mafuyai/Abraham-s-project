import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps, ICON_DEFAULTS } from './types';

export default function User({
    size = ICON_DEFAULTS.size,
    color = ICON_DEFAULTS.color,
    strokeWidth = ICON_DEFAULTS.strokeWidth,
}: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle
                cx="12"
                cy="8"
                r="4"
                stroke={color}
                strokeWidth={strokeWidth}
            />
            <Path
                d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
