import React, {
	ForwardRefRenderFunction,
	ButtonHTMLAttributes,
	ReactNode,
	forwardRef,
} from 'react';
import { cx } from '@emotion/css';

import { SizeType } from '../config/size';
import { getButtonStyles } from './style';

const ButtonTypes: string[] = [
	'default',
	'primary',
	'ghost',
	'dashed',
	'link',
	'text',
];
const ButtonShapes: string[] = ['circle', 'round'];
const ButtonHTMLTypes: string[] = ['submit', 'button', 'reset'];

export type ButtonType = typeof ButtonTypes[number];
export type ButtonShape = typeof ButtonShapes[number];
export type ButtonHTMLType = typeof ButtonHTMLTypes[number];

export interface BaseButtonProps {
	type?: ButtonType;
	icon?: ReactNode;
	shape?: ButtonShape;
	size?: SizeType;
	loading?: boolean | { delay?: number };
	prefixCls?: string;
	className?: string;
	ghost?: boolean;
	danger?: boolean;
	block?: boolean;
	children?: ReactNode;
}

export type ButtonProps = BaseButtonProps &
	ButtonHTMLAttributes<HTMLButtonElement> & {};

const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
	props,
	ref,
) => {
	const { type = 'primary', className, size, children, ...otherProps } = props;

	//TODO
	// const theme = getTheme();

	const styles = getButtonStyles();

	return (
		<button className={cx(styles, className)} ref={ref} {...otherProps}>
			{children && <span>{children}</span>}
		</button>
	);
};

Button.displayName = 'Button';

export default forwardRef(Button);
