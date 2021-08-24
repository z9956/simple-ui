import { css } from '@emotion/css';

import { SizeType } from '../config/size';
import { ButtonTypes } from './button';
import { defaultStyles } from '../styles/default';


export type StyleProps = {
	size: SizeType;
	variant?: ButtonTypes;
};

// const getDisabledStyles = () => {};
//
const getButtonColors = (variant: ButtonTypes) => {
	const colors = {
		secondary: {
			borderColor: defaultStyles.border,
			color: defaultStyles.secondary,
			background: defaultStyles.background,
		},
		primary: {
			borderColor: defaultStyles.primary,
			color: '#fff',
			background: defaultStyles.primary,
		},
		error: {
			borderColor: defaultStyles.error,
			color: '#fff',
			background: defaultStyles.error,
		},
	};

	return colors[variant];
};

export const getButtonStyles = (props: StyleProps) => {
	const { size, variant } = props;
	const sizeStyles = getButtonSize(size);
	const variantStyles = getButtonColors(variant);
	const disabledStyles = {
		borderColor: defaultStyles.disabled,
		color: '#ccc',
		background: defaultStyles.disabledBorder,
	};

	return {
		button: css({
			cursor: 'pointer',
			textAlign: `center`,
			border: `1px solid transparent`,
			...sizeStyles,
			...variantStyles,
			':disabled': disabledStyles,
			'&[disabled]': disabledStyles,
		}),
	};
};

const getButtonSize = (size: SizeType) => {
	const defaultSize = {
		width: 'initial',
		height: '2.75rem',
		padding: '1.875rem',
		fontSize: '1rem',
	};

	switch (size) {
		case 'sm':
			return {
				width: '60px',
				height: '24px',
				padding: '0 7px',
				fontSize: '14px',
				borderRadius:'2px',
				lineHeight: '1.5'
			};
		case 'md':
			return defaultSize;
		case 'lg':
			return {
				width: 'initial',
				height: '2.75rem',
				padding: '1.875rem',
				fontSize: '1rem',
			};
		default:
			return defaultSize;
	}
};
