import { css } from '@emotion/css';

import { SizeType } from '../config/size';
import { ButtonType } from './button';
import { defaultStyles } from '../styles/default';

export type StyleProps = {
	size: SizeType;
	type?: ButtonType;
};

// const getDisabledStyles = () => {};
//
const getButtonColors = (type: ButtonType) => {
	const colors = {
		default: {
			border: defaultStyles.border,
			color: defaultStyles.defaultColor,
			background: defaultStyles.background,
		},
		success: {
			border: defaultStyles.success,
			color: '#fff',
			background: defaultStyles.success,
		},
		error: {
			border: defaultStyles.error,
			color: '#fff',
			background: defaultStyles.error,
		},
	};

	return colors[type];
};

export const getButtonStyles = (props: StyleProps) => {
	const { size, type } = props;
	const { width, height, padding, fontSize } = getButtonSize(size);
	const variantStyles = getButtonColors(type);
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
