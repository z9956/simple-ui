import { FC, MouseEvent } from 'react';

import { usePopoverContext } from './context';

export type PopoverItemProps = {
	className?: string;
	onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};

const PopoverItem: FC<PopoverItemProps> = ({
	onClick,
	className,
	children,
}) => {
	const { onItemClick } = usePopoverContext();

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		onClick?.(e);
		onItemClick?.();
	};

	return (
		<div className={className} onClick={handleClick}>
			{children}
		</div>
	);
};
PopoverItem.displayName = 'PopoverItem';

export default PopoverItem;
