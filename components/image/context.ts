import { createContext, useContext } from 'react';
import { PreviewUrl } from './Group';

export interface CheckboxGroupContext {
	inGroup: boolean;
	current: number;
	previewUrls: Map<number, PreviewUrl>;
	setCurrent?: (id: number) => void;
	setPreview?: (state: boolean) => void;
	registerImage?: (id: number, src: string) => void;
}

export const GroupContext = createContext<CheckboxGroupContext>({
	current: 0,
	previewUrls: new Map(),
	inGroup: false,
});

export const useGroupContext = (): CheckboxGroupContext =>
	useContext(GroupContext);
