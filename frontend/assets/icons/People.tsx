import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps, ICON_DEFAULTS } from './types';

export default function People({
    size = ICON_DEFAULTS.size,
    color = ICON_DEFAULTS.color,
    strokeWidth = ICON_DEFAULTS.strokeWidth,
}: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle cx="9" cy="8" r="3.5" stroke={color} strokeWidth={strokeWidth} />
            <Path
                d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M16 4.5a3.5 3.5 0 0 1 0 7"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M19 20c0-2.6-1.6-4.8-4-5.7"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
