import { useEffect, useRef, useState } from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';

interface Props {
    value: number;
    duration?: number;
    style?: StyleProp<TextStyle>;
}

export default function CountUp({ value, duration = 700, style }: Props) {
    const [display, setDisplay] = useState(value);
    const lastValue = useRef(value);
    const rafRef = useRef<number | null>(null);
    const startTime = useRef(0);
    const startValue = useRef(value);

    useEffect(() => {
        if (value === lastValue.current) return;

        startValue.current = lastValue.current;
        startTime.current = Date.now();
        lastValue.current = value;

        const tick = () => {
            const now = Date.now();
            const t = Math.min(1, (now - startTime.current) / duration);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            const current = Math.round(
                startValue.current + (value - startValue.current) * eased
            );
            setDisplay(current);
            if (t < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                rafRef.current = null;
            }
        };

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [value, duration]);

    return <Text style={style}>{display}</Text>;
}
