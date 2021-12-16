import { createContext, useContext } from 'react';
import { CheckboxValueType } from './Group';

export interface CheckboxGroupContext {
	values: CheckboxValueType[];
	disabled: boolean;
	inGroup: boolean;
	// registerValue: (val: string) => void;
	// cancelValue: (val: string) => void;
	updateState?: (value: CheckboxValueType, checked: boolean) => void;
}

export const GroupContext = createContext<CheckboxGroupContext>({
	values: [],
	inGroup: false,
	disabled: false,
});

export const useGroupContext = (): CheckboxGroupContext =>
	useContext(GroupContext);
