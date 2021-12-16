import {
	InputHTMLAttributes,
	ReactNode,
	FC,
	ChangeEvent,
	useCallback,
	useState,
	useEffect,
} from 'react';
import { cx } from '@emotion/css';

import { useGroupContext } from './context';
import { getCheckboxStyles } from './style';
import { CheckboxValueType } from './Group';

export interface BaseCheckboxProps {
	// value?: string | number | boolean;
	value?: CheckboxValueType;
	className?: string;
	children?: ReactNode;
	defaultChecked?: boolean;
	onChange?: (event: CheckboxEvent) => void;
}

export interface CheckboxEventTarget {
	checked: boolean;
}

export interface CheckboxEvent {
	target: CheckboxEventTarget;
	stopPropagation: () => void;
	preventDefault: () => void;
	nativeEvent: ChangeEvent;
}

type NativeAttrs = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	keyof BaseCheckboxProps
>;

export type CheckboxProps = BaseCheckboxProps & NativeAttrs;

const Checkbox: FC<CheckboxProps> = (props) => {
	const {
		value = '',
		className,
		children,
		checked,
		disabled,
		defaultChecked = false,
		onChange,
		...otherProps
	} = props;

	const [selfChecked, setSelfChecked] = useState<boolean>(defaultChecked);
	const {
		updateState,
		inGroup,
		disabled: disabledAll,
		values,
	} = useGroupContext();

	const isDisabled = inGroup ? disabledAll || disabled : disabled;

	if (inGroup) {
		useEffect(() => {
			const next = values.includes(value);

			if (next !== selfChecked) {
				setSelfChecked(next);
			}
		}, [values.join(',')]);
	}

	const styles = getCheckboxStyles();

	const handleChange = useCallback(
		(e: ChangeEvent) => {
			if (isDisabled) return;

			const event: CheckboxEvent = {
				target: {
					checked: !selfChecked,
				},
				stopPropagation: e.stopPropagation,
				preventDefault: e.preventDefault,
				nativeEvent: e,
			};

			if (inGroup && updateState) updateState?.(value, !selfChecked);

			setSelfChecked(!selfChecked);
			onChange?.(event);
		},
		[updateState, onChange, isDisabled, selfChecked],
	);

	useEffect(() => {
		if (checked !== undefined) {
			setSelfChecked(checked);
		}
	}, [checked]);

	return (
		<label className={cx(styles.wrap, disabled && styles.disabled, className)}>
			<span className={styles.checkbox}>
				<input
					type="checkbox"
					checked={selfChecked}
					disabled={isDisabled}
					onChange={handleChange}
					{...otherProps}
				/>
			</span>

			{children && <span className={styles.label}>{children}</span>}
		</label>
	);
};

Checkbox.displayName = 'Checkbox';

export default Checkbox;
