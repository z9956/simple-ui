import { ReactNode, FC, HTMLAttributes, useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';

import { GroupContext } from './context';

export type CheckboxValueType = string | number;

export interface BaseGroupProps {
	value: CheckboxValueType[];
	disabled?: boolean;
	className?: string;
	children?: ReactNode;
	onChange?: (value: CheckboxValueType[]) => void;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof BaseGroupProps>;

export type CheckboxGroupProps = BaseGroupProps & NativeAttrs;

const Group: FC<CheckboxGroupProps> = (props) => {
	const { value, disabled = false, onChange, className, children } = props;

	const [selfValue, setSelfValue] = useState<CheckboxValueType[]>([]);

	const updateState = (val: CheckboxValueType, checked: boolean) => {
		const removed = selfValue.filter((v) => v !== val);
		const next = checked ? [...removed, val] : removed;
		setSelfValue(next);

		onChange?.(next);

		console.log(removed, next, val);
	};

	const providerValue = {
		disabled,
		values: selfValue,
		inGroup: true,
		updateState,
	};

	useEffect(() => {
		setSelfValue(value);
	}, [value.join(',')]);

	return (
		<GroupContext.Provider value={providerValue}>
			<div
				className={cx(
					css`
						width: auto;
						box-sizing: border-box;
						display: inline-block;

						> label {
							margin-right: 8px;
						}
					`,
					className,
				)}
			>
				{children}
			</div>
		</GroupContext.Provider>
	);
};

Group.displayName = 'Group';

export default Group;
