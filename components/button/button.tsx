import React, {
	ForwardRefRenderFunction,
	MouseEvent,
	ReactNode,
	forwardRef,
} from 'react';
import { SizeType } from '../config/size';

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

export type NativeButtonProps = {
	htmlType?: ButtonHTMLType;
};

export type ButtonProps = BaseButtonProps & NativeButtonProps & {};

const Button: ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {};

	return <button onClick={handleClick} />;
};

Button.displayName = 'Button';

export default forwardRef(Button);
