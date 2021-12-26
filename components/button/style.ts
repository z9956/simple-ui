import { css, cx } from '@emotion/css';

import { SizeType } from '../config/size';
import { ButtonTypes } from './Button';
import { defaultStyles } from '../styles/default';

export type StyleProps = {
	size: SizeType;
	variant: ButtonTypes;
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

const getButtonHoverColors = (variant: ButtonTypes) => {
	const colors = {
		secondary: {
			borderColor: defaultStyles.primary,
			color: defaultStyles.primary,
		},
		primary: {
			opacity: 0.8,
		},
		error: {
			opacity: 0.8,
		},
	};

	return colors[variant];
};

export const disabledStyles = {
	borderColor: defaultStyles.disabled,
	color: defaultStyles.disabledColor,
	background: defaultStyles.disabledBorder,
};

export const getButtonStyles = (props: StyleProps) => {
	const { size, variant } = props;
	const sizeStyles = getButtonSize(size);
	const variantStyles = getButtonColors(variant);
	const hoverStyles = getButtonHoverColors(variant);

	return {
		button: cx(
			css({
				boxSizing: 'border-box',
				cursor: 'pointer',
				userSelect: 'none',
				textAlign: 'center',
				border: '1px solid transparent',
				borderRadius: '5px',
				...sizeStyles,
				...variantStyles,
			}),
			css`
				transition: 0.1s all;

				&[disabled] {
					cursor: not-allowed;
					${css({ ...disabledStyles })};
				}

				:active {
					transform: scale(0.95);
				}

				:hover {
					${css({ ...hoverStyles })};
				}
			`,
		),
		icon: css`
			display: inline-flex;
			margin-right: 8px;
			vertical-align: -0.125em;
		`,
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
