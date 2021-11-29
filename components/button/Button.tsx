import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cx } from '@emotion/css';

import { SizeType } from '../config/size';
import { getButtonStyles } from './style';
import { tuple } from '../type/type';

export const buttonTypes = tuple('secondary', 'primary', 'error');

export type ButtonTypes = typeof buttonTypes[number];

export interface BaseButtonProps {
	variant?: ButtonTypes;
	icon?: ReactNode;
	size?: SizeType;
	loading?: boolean | { delay?: number };
	prefixCls?: string;
	className?: string;
	block?: boolean;
	children?: ReactNode;
}

export type ButtonProps = BaseButtonProps &
	ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		variant = 'primary',
		size = 'md',
		disabled,
		className,
		children,
		...otherProps
	} = props;

	//TODO
	// const theme = getTheme();

	const styles = getButtonStyles({ variant, size });

	return (
		<button
			className={cx(styles.button, className)}
			disabled={disabled}
			ref={ref}
			{...otherProps}
		>
			{children && <span>{children}</span>}
		</button>
	);
});

Button.displayName = 'Button';

export default Button;