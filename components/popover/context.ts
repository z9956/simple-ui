import { createContext, useContext } from 'react';

export interface PopoverContext {
	onItemClick?: () => void;
}

export const PopoverContext = createContext<PopoverContext>({
	onItemClick: () => {},
});

export const usePopoverContext = (): PopoverContext =>
	useContext(PopoverContext);
