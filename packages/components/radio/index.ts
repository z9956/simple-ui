import Radio from './Radio';
import Group from './Group';

export type RadioComponentType = typeof Radio & {
	Group: typeof Group;
};

export type { RadioProps, RadioEvent } from './Radio';
export type { RadioGroupProps } from './Group';

(Radio as RadioComponentType).Group = Group;

export default Radio as RadioComponentType;
