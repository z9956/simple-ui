import {
	ForwardRefRenderFunction,
	ButtonHTMLAttributes,
	ReactNode,
	forwardRef,
} from 'react';
import { cx } from '@emotion/css';

import { SizeType } from '../config/size';
import { getButtonStyles } from './style';
import { tuple } from '../type/type';

export const buttonTypes = tuple('secondary', 'primary', 'error');
// export const buttonShapes: tuple('circle', 'round');

export type ButtonTypes = typeof buttonTypes[number];
// export type ButtonShapes = typeof buttonShapes[number];

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
	ButtonHTMLAttributes<HTMLButtonElement> & {};

export const Button: ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> =
	(props, ref) => {
		const {
			variant = 'primary',
			className,
			size,
			children,
			...otherProps
		} = props;

		//TODO
		// const theme = getTheme();

		const styles = getButtonStyles({ variant, size });

		return (
			<button
				className={cx(styles.button, className)}
				ref={ref}
				{...otherProps}
			>
				{children && <span>{children}</span>}
			</button>
		);
	};

Button.displayName = 'Button';

export default forwardRef(Button);
