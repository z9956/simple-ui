import { css, cx } from '@emotion/css';

import { defaultStyles } from '../styles/default';
import { VariantType } from './Tag';

const getColors = (variant: VariantType) => {
	const colors: {
		[key in VariantType]: { background: string; color: string };
	} = {
		secondary: {
			color: defaultStyles.defaultColor,
			background: defaultStyles.disabled,
		},
		primary: {
			color: defaultStyles.white,
			background: defaultStyles.primary,
		},
		error: {
			color: defaultStyles.white,
			background: defaultStyles.error,
		},
	};

	return colors[variant];
};

export const getTagStyles = (type: VariantType, color?: string) => {
	let bgColor = color;
	let textColor = defaultStyles.white;

	if (!color) {
		const { color: customColor, background } = getColors(type);
		bgColor = background;
		textColor = customColor;
	}

	return {
		tag: cx(
			css`
				display: inline-block;
				align-items: center;
				width: auto;
				height: auto;
				cursor: pointer;
				line-height: 1em;
				padding: 3px 6px;
				border-radius: 2px;
				box-sizing: border-box;
				color: ${textColor};
				border: 1px solid ${defaultStyles.defaultBorder};
				font-size: 12px;
				background-color: ${bgColor};
			`,
		),
	};
};
