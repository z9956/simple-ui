import Popover from './Popover';
import PopoverItem from './PopoverItem';

export type PopoverComponentType = typeof Popover & {
	Item: typeof PopoverItem;
};

export type { PopoverProps } from './Popover';
export type { PopoverItemProps } from './PopoverItem';

(Popover as PopoverComponentType).Item = PopoverItem;
export default Popover as PopoverComponentType;
