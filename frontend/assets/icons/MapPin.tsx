import Svg, { Path, Circle } from 'react-native-svg';
import { IconProps, ICON_DEFAULTS } from './types';

export default function MapPin({
    size = ICON_DEFAULTS.size,
    color = ICON_DEFAULTS.color,
    strokeWidth = ICON_DEFAULTS.strokeWidth,
}: IconProps) {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth={strokeWidth} />
        </Svg>
    );
}
