import {
	forwardRef,
	useRef,
	useState,
	useEffect,
	useMemo,
	useImperativeHandle,
	InputHTMLAttributes,
	ReactNode,
	ChangeEvent,
	KeyboardEvent,
	MouseEvent,
} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { cx } from '@emotion/css';

import { getInputStyles } from './style';

export interface BaseInputProps {
	className?: string;
	prefix?: ReactNode;
	suffix?: ReactNode;
	allowClear?: boolean;
	defaultValue?: string;
	onPressEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

type NativeAttrs = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'prefix' | 'suffix'
>;

export type InputProps = BaseInputProps & NativeAttrs;

export function triggerFocus(ele?: HTMLInputElement, options?: FocusOptions) {
	if (!ele) return;

	ele.focus(options);

	const len = ele.value.length;

	if (len) {
		ele.setSelectionRange(0, len);
	} else {
		ele.setSelectionRange(0, 0);
	}
}

const simulateChangeEvent = (
	el: HTMLInputElement,
	event: MouseEvent<SVGElement>,
): ChangeEvent<HTMLInputElement> => {
	return {
		...event,
		target: el,
		currentTarget: el,
	};
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const {
		type = 'text',
		allowClear,
		value,
		children,
		className,
		disabled,
		readOnly,
		defaultValue = '',
		onBlur,
		onChange,
		onKeyDown,
		onPressEnter,
		prefix,
		size,
		style,
		suffix,
		width = 0,
		...otherProps
	} = props;

	const [inputValue, setInputValue] = useState<string>(defaultValue);
	const isControlledComponent = useMemo(() => value !== undefined, [value]);

	const inputRef = useRef<HTMLInputElement>(null);
	useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

	const inputWidth = width ?? style?.width;
	const styles = getInputStyles({ width: inputWidth });

	const inputClass = cx(
		styles.input,
		disabled && styles.disabled,
		Boolean(suffix ?? allowClear) && styles.wrap,
		className,
	);

	const handleClear = (e: MouseEvent<SVGElement>) => {
		e.preventDefault();
		e.stopPropagation();

		if (inputRef.current) {
			setInputValue('');

			// const changeEvent = {target: inputRef.current} as ChangeEvent<HTMLInputElement>;
			const changeEvent = simulateChangeEvent(inputRef.current, e);

			changeEvent.target.value = '';
			onChange?.(changeEvent);
			focus();
		}
	};

	const focus = () => {
		if (inputRef && inputRef.current) {
			// triggerFocus(inputRef.current);
			inputRef.current.focus();
		}
	};

	const renderClearIcon = () => {
		if (allowClear && inputRef.current && inputRef.current.value !== '') {
			return (
				<span className={styles.suffix}>
					<AiOutlineClose onClick={handleClear} />
				</span>
			);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (disabled || readOnly) return;
		setInputValue(e.target.value);

		onChange?.(e);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			onPressEnter && onPressEnter(e);
		}

		onKeyDown?.(e);
	};

	useEffect(() => {
		if (isControlledComponent) setInputValue(value as string);
	});

	const controlledValue = isControlledComponent
		? { value: inputValue }
		: { defaultValue };

	const inputProps = {
		...otherProps,
		...controlledValue,
	};

	return (
		<div className={inputClass} style={style}>
			{prefix && <span className={styles.prefix}>{prefix}</span>}
			<input
				type={type}
				ref={inputRef}
				disabled={disabled}
				readOnly={readOnly}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				{...inputProps}
			/>
			{allowClear && renderClearIcon()}
			{suffix && (
				<span onClick={focus} className={styles.suffix}>
					{suffix}
				</span>
			)}
			{children && <span>{children}</span>}
		</div>
	);
});

Input.displayName = 'Input';

export default Input;
