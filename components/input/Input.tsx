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
	FocusEvent,
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
		ele.setSelectionRange(len, len);
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
		onFocus,
		onChange,
		onKeyDown,
		onPressEnter,
		autoComplete,
		prefix,
		size,
		style,
		suffix,
		width = 0,
		...otherProps
	} = props;

	const [inputValue, setInputValue] = useState<string>(defaultValue);
	const [focused, setFocused] = useState<boolean>(false);
	const isControlledComponent = useMemo(() => value !== undefined, [value]);

	const inputRef = useRef<HTMLInputElement>(null);
	useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

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
			triggerFocus(inputRef.current);
			// inputRef.current.focus()
		}
	};

	const renderClearIcon = () => {
		if (allowClear && inputRef.current && inputRef.current.value !== '') {
			return (
				<span className={styles.clear}>
					<AiOutlineClose onClick={handleClear} />
				</span>
			);
		}

		return <span className={styles.clear} />;
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

	const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
		setFocused(true);

		focus();

		onFocus?.(e);
	};

	const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
		setFocused(false);
		onBlur?.(e);
	};

	const handleSuffix = (e: MouseEvent<HTMLSpanElement>) => {
		e.preventDefault();
		e.stopPropagation();
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

	const inputWidth = width ?? style?.width;
	const styles = getInputStyles({ width: inputWidth });

	const inputClass = cx(styles.input, disabled && styles.disabled, className);

	const inputWarp = cx(
		styles.focused,
		styles.inputWarp,
		focused && styles.focused,
	);

	return (
		<div className={inputClass} style={style}>
			<span className={inputWarp}>
				{prefix && <span className={styles.prefix}>{prefix}</span>}
				<input
					type={type}
					ref={inputRef}
					disabled={disabled}
					readOnly={readOnly}
					autoComplete={autoComplete}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					{...inputProps}
				/>
				{allowClear && renderClearIcon()}
			</span>
			{suffix && (
				<span onClick={handleSuffix} className={styles.suffix}>
					{suffix}
				</span>
			)}
			{children && <span>{children}</span>}
		</div>
	);
});

Input.displayName = 'Input';

export default Input;
