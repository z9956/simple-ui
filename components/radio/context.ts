import { createContext, useContext } from 'react';
import { RadioValueType } from './Group';

export interface CheckboxGroupContext {
	value?: RadioValueType;
	disabled: boolean;
	inGroup: boolean;
	updateState?: (value: RadioValueType) => void;
}

export const GroupContext = createContext<CheckboxGroupContext>({
	inGroup: false,
	disabled: false,
});

export const useGroupContext = (): CheckboxGroupContext =>
	useContext(GroupContext);
