import Svg, { Path, Circle } from 'react-native-svg';

type Props = { size?: number; color?: string };

export default function Logo({ size = 64, color = '#1A6B3A' }: Props) {
    const stroke = Math.max(2.5, size * 0.058);
    const thin = Math.max(2, size * 0.045);
    return (
        <Svg width={size} height={size} viewBox="0 0 96 96" fill="none">
            <Path
                d="M24 74 C20 54, 30 36, 54 32 C50 54, 42 66, 24 74 Z"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <Path
                d="M28 70 L50 36"
                stroke={color}
                strokeWidth={thin}
                strokeLinecap="round"
            />
            <Path
                d="M60 26 A10 10 0 0 1 60 40"
                stroke={color}
                strokeWidth={thin}
                strokeLinecap="round"
                fill="none"
            />
            <Path
                d="M68 18 A18 18 0 0 1 68 44"
                stroke={color}
                strokeWidth={thin}
                strokeLinecap="round"
                fill="none"
            />
            <Circle cx="54" cy="32" r="3" fill={color} />
        </Svg>
    );
}
