import { Icons, IconName } from '../../assets/icons';

type Props = {
    name: IconName;
    size?: number;
    color?: string;
    strokeWidth?: number;
};

export default function Icon({ name, size, color, strokeWidth }: Props) {
    const Cmp = Icons[name];
    return <Cmp size={size} color={color} strokeWidth={strokeWidth} />;
}
