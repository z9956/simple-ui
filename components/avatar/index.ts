import Avatar from './Avatar';
import Group from './Group';

export type AvatarComponentType = typeof Avatar & {
	Group: typeof Group;
};

export type { AvatarProps } from './Avatar';
export type { GroupProps } from './Group';

(Avatar as AvatarComponentType).Group = Group;

export default Avatar as AvatarComponentType;
