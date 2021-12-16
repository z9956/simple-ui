import { ReactNode, FC, HTMLAttributes, useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';

import { GroupContext } from './context';

export type RadioValueType = string | number;

export interface BaseGroupProps {
	value: RadioValueType;
	disabled?: boolean;
	className?: string;
	children?: ReactNode;
	onChange?: (value: RadioValueType) => void;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof BaseGroupProps>;

export type RadioGroupProps = BaseGroupProps & NativeAttrs;

const Group: FC<RadioGroupProps> = (props) => {
	const { value, disabled = false, onChange, className, children } = props;

	const [selfValue, setSelfValue] = useState<RadioValueType>(value);

	const updateState = (val: RadioValueType) => {
		setSelfValue(val);

		onChange?.(val);
	};

	const providerValue = {
		disabled,
		value: selfValue,
		inGroup: true,
		updateState,
	};

	useEffect(() => {
		setSelfValue(value);
	}, [value]);

	return (
		<GroupContext.Provider value={providerValue}>
			<div
				className={cx(
					css`
						width: auto;
						caret-color: transparent;
						box-sizing: border-box;

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
