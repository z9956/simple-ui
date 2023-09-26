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
	// loading?: boolean | { delay?: number };
	className?: string;
	children?: ReactNode;
}

export type ButtonProps = BaseButtonProps &
	ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		variant = 'secondary',
		size = 'md',
		icon,
		disabled = false,
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
			{icon && <span className={styles.icon}>{icon}</span>}
			{children && <span>{children}</span>}
		</button>
	);
});

Button.displayName = 'Button';

export default Button;
