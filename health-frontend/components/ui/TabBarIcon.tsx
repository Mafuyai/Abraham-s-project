import Icon from './Icon';
import { IconName } from '../../assets/icons';

type Props = {
    name: IconName;
    color: string;
    focused?: boolean;
};

export default function TabBarIcon({ name, color, focused }: Props) {
    return (
        <Icon
            name={name}
            size={24}
            color={color}
            strokeWidth={focused ? 2 : 1.6}
        />
    );
}
