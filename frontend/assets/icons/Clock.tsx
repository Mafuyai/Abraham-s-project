import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps, ICON_DEFAULTS } from './types';

export default function Clock({
    size = ICON_DEFAULTS.size,
    color = ICON_DEFAULTS.color,
    strokeWidth = ICON_DEFAULTS.strokeWidth,
}: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle
                cx="12"
                cy="12"
                r="9"
                stroke={color}
                strokeWidth={strokeWidth}
            />
            <Path
                d="M12 7v5l3 2"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
