import Image from './Image';
import Group from './Group';

export type ImageComponentType = typeof Image & {
	Group: typeof Group;
};

export type { ImageProps } from './Image';
export type { ImageGroupProps } from './Group';

(Image as ImageComponentType).Group = Group;
export default Image as ImageComponentType;
