export { default as ArrowLeft } from './ArrowLeft';
export { default as ChevronRight } from './ChevronRight';
export { default as Scan } from './Scan';
export { default as User } from './User';
export { default as UserPlus } from './UserPlus';
export { default as Leaf } from './Leaf';
export { default as Home } from './Home';
export { default as Clock } from './Clock';
export { default as Shield } from './Shield';
export { default as Grid } from './Grid';
export { default as People } from './People';
export { default as Cube } from './Cube';
export { default as List } from './List';
export { default as Plus } from './Plus';
export { default as Close } from './Close';
export { default as Check } from './Check';
export { default as Inbox } from './Inbox';
export { default as MapPin } from './MapPin';
export { default as Logo } from './Logo';
export type { IconProps } from './types';

import ArrowLeft from './ArrowLeft';
import ChevronRight from './ChevronRight';
import Scan from './Scan';
import User from './User';
import UserPlus from './UserPlus';
import Leaf from './Leaf';
import Home from './Home';
import Clock from './Clock';
import Shield from './Shield';
import Grid from './Grid';
import People from './People';
import Cube from './Cube';
import List from './List';
import Plus from './Plus';
import Close from './Close';
import Check from './Check';
import Inbox from './Inbox';
import MapPin from './MapPin';
import Logo from './Logo';

export const Icons = {
    'arrow-left': ArrowLeft,
    'chevron-right': ChevronRight,
    scan: Scan,
    user: User,
    'user-plus': UserPlus,
    leaf: Leaf,
    home: Home,
    clock: Clock,
    shield: Shield,
    grid: Grid,
    people: People,
    cube: Cube,
    list: List,
    plus: Plus,
    close: Close,
    check: Check,
    inbox: Inbox,
    'map-pin': MapPin,
    logo: Logo,
} as const;

export type IconName = keyof typeof Icons;
