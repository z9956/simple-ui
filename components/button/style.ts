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
			border: defaultStyles.border,
			color: defaultStyles.secondary,
			background: defaultStyles.background,
		},
		primary: {
			border: defaultStyles.primary,
			color: '#fff',
			background: defaultStyles.primary,
		},
		error: {
			border: defaultStyles.error,
			color: '#fff',
			background: defaultStyles.error,
		},
	};

	return colors[variant];
};

export const getButtonStyles = (props: StyleProps) => {
	const { size, variant } = props;
	const { width, height, padding, fontSize } = getButtonSize(size);
	const variantStyles = getButtonColors(variant);
	const disabledStyles = {
		border: defaultStyles.disabled,
		color: '#ccc',
		background: defaultStyles.disabledBorder,
	};

	return {
		button: css({
			cursor: 'pointer',
			width,
			height,
			padding,
			fontSize,
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
				width: 'initial',
				height: '2rem',
				padding: '1.875rem',
				fontSize: '1rem',
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
