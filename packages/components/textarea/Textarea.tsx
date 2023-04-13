import {
	forwardRef,
	useRef,
	useState,
	useEffect,
	useMemo,
	useImperativeHandle,
	ChangeEvent,
	KeyboardEvent,
	MouseEvent,
	FocusEvent,
	TextareaHTMLAttributes,
} from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { cx } from '@emotion/css';

import { getTextareaStyles } from './style';

export interface BaseInputProps {
	className?: string;
	allowClear?: boolean;
	defaultValue?: string;
	onPressEnter?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

type NativeAttrs = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'type'>;

export type TextareaProps = BaseInputProps & NativeAttrs;

const simulateChangeEvent = (
	el: HTMLTextAreaElement,
	event: MouseEvent<SVGElement>,
): ChangeEvent<HTMLTextAreaElement> => {
	return {
		...event,
		target: el,
		currentTarget: el,
	};
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(props, ref) => {
		const {
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
			style,
			...otherProps
		} = props;

		const [inputValue, setInputValue] = useState<string>(defaultValue);
		const [focused, setFocused] = useState<boolean>(false);
		const isControlledComponent = useMemo(() => value !== undefined, [value]);

		const inputRef = useRef<HTMLTextAreaElement>(null);
		useImperativeHandle(ref, () => inputRef.current as HTMLTextAreaElement);

		const handleClear = (e: MouseEvent<SVGElement>) => {
			e.preventDefault();
			e.stopPropagation();

			if (inputRef.current) {
				setInputValue('');

				const changeEvent = simulateChangeEvent(inputRef.current, e);

				changeEvent.target.value = '';
				onChange?.(changeEvent);
				focus();
			}
		};

		const focus = () => {
			if (inputRef && inputRef.current) {
				inputRef.current.focus();
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

		const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
			if (disabled || readOnly) return;
			setInputValue(e.target.value);

			onChange?.(e);
		};

		const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
			if (e.code === 'Enter') {
				onPressEnter && onPressEnter(e);
			}

			onKeyDown?.(e);
		};

		const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
			setFocused(true);

			focus();

			onFocus?.(e);
		};

		const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
			setFocused(false);
			onBlur?.(e);
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

		const styles = getTextareaStyles();

		const inputWarp = cx(styles.inputWarp, focused && styles.focused);
		const inputClass = cx(
			styles.input,
			disabled && styles.disabled,
			inputWarp,
			className,
		);

		return (
			<div className={inputClass} style={style}>
				<textarea
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
			</div>
		);
	},
);

Textarea.displayName = 'Textarea';

export default Textarea;
