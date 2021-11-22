import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cx } from '@emotion/css';

import { getInputStyles } from './style';

export interface BaseInputProps {
	className?: string;
	prefix?: ReactNode;
	suffix?: ReactNode;
}

type NativeAttrs = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'prefix' | 'suffix'
>;

export type InputProps = BaseInputProps & NativeAttrs;

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const {
		type = 'text',
		prefix,
		suffix,
		className,
		size,
		children,
		...otherProps
	} = props;

	const styles = getInputStyles();

	return (
		<div className={cx(styles.input, className)}>
			{prefix && prefix}
			<input type={type} ref={ref} {...otherProps} />
			{suffix && suffix}

			{children && <span>{children}</span>}
		</div>
	);
});

Input.displayName = 'Input';

export default Input;
