import Checkbox from './Checkbox';
import Group from './Group';

export type CheckboxComponentType = typeof Checkbox & {
	Group: typeof Group;
};

export type { CheckboxProps, CheckboxEvent } from './Checkbox';
export type { CheckboxGroupProps } from './Group';

(Checkbox as CheckboxComponentType).Group = Group;

export default Checkbox as CheckboxComponentType;
