import { css } from '@emotion/css';

import { defaultStyles } from '../styles/default';

export const getInputStyles = () => {
	// const { size, variant } = props;
	// const sizeStyles = getInputSize(size);
	// const variantStyles = getInputColors(variant);

	const disabledStyles = {
		borderColor: defaultStyles.disabled,
		color: '#ccc',
		background: defaultStyles.disabledBorder,
	};

	return {
		input: css({
			cursor: 'pointer',
			textAlign: 'center',
			border: '1px solid transparent',
			borderRadius: '5px',
			// ...sizeStyles,
			// ...variantStyles,
			':disabled': disabledStyles,
			'&[disabled]': disabledStyles,
		}),
	};
};
