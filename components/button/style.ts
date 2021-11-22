import { css } from '@emotion/css';

import { SizeType } from '../config/size';
import { ButtonTypes } from './Button';
import { defaultStyles } from '../styles/default';

export type StyleProps = {
	size: SizeType;
	variant?: ButtonTypes;
};

const getButtonColors = (variant: ButtonTypes) => {
	const colors = {
		secondary: {
			borderColor: defaultStyles.border,
			color: defaultStyles.defaultColor,
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
			textAlign: 'center',
			border: '1px solid transparent',
			borderRadius: '5px',
			...sizeStyles,
			...variantStyles,
			':disabled': disabledStyles,
			'&[disabled]': disabledStyles,
		}),
	};
};

const getButtonSize = (size: SizeType) => {
	const defaultSize = {
		height: '32px',
		padding: '4px 15px',
		fontSize: '14px',
		lineHeight: '1.5715',
	};

	switch (size) {
		case 'sm':
			return {
				height: '24px',
				padding: '0 7px',
				fontSize: '14px',
				borderRadius: '2px',
				lineHeight: '1.5715',
			};
		case 'md':
			return defaultSize;
		case 'lg':
			return {
				height: '40px',
				padding: '6px 15px',
				fontSize: '14px',
				lineHeight: '1.5715',
			};
		default:
			return defaultSize;
	}
};
