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
import { getRadioStyles } from './style';
import { RadioValueType } from './Group';

export interface BaseRadioProps {
	value?: RadioValueType;
	className?: string;
	children?: ReactNode;
	defaultChecked?: boolean;
	onChange?: (event: RadioEvent) => void;
}

export interface RadioEventTarget {
	checked: boolean;
}

export interface RadioEvent {
	target: RadioEventTarget;
	stopPropagation: () => void;
	preventDefault: () => void;
	nativeEvent: ChangeEvent;
}

type NativeAttrs = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	keyof BaseRadioProps
>;

export type RadioProps = BaseRadioProps & NativeAttrs;

const Radio: FC<RadioProps> = (props) => {
	const {
		value,
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
		value: GroupValue,
	} = useGroupContext();

	const isDisabled = inGroup ? disabledAll || disabled : disabled;

	if (inGroup) {
		if (checked !== undefined) {
			new Error('Remove props "checked"');
		}

		if (value === undefined) {
			new Error('`value` is not a valid prop');
		}
	}

	useEffect(() => {
		if (inGroup) {
			const next = GroupValue === value;

			if (next !== selfChecked) {
				setSelfChecked(next);
			}
		}
	}, [GroupValue, inGroup]);

	const styles = getRadioStyles();

	const handleChange = useCallback(
		(e: ChangeEvent) => {
			if (isDisabled) return;

			const event: RadioEvent = {
				target: {
					checked: !selfChecked,
				},
				stopPropagation: e.stopPropagation,
				preventDefault: e.preventDefault,
				nativeEvent: e,
			};

			if (inGroup && updateState) updateState?.(value as RadioValueType);

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
		<label
			className={cx(styles.wrap, isDisabled && styles.disabled, className)}
		>
			<span>
				<input
					type="radio"
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

Radio.displayName = 'Radio';

export default Radio;
