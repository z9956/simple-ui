import { css } from '@emotion/css';

import { SizeType } from '../config/size';
import { ButtonType } from './button';

export type StyleProps = {
	size: SizeType;
	type?: ButtonType;
};

// const getDisabledStyles = () => {};
//
// const getButtonColors = () => {};

export const getButtonStyles = (props: StyleProps) => {
	const { size } = props;
	const { padding, fontSize } = getButtonSize(size);

	return {
		button: css({
			cursor: 'pointer',
			padding,
			fontSize,
		}),
	};
};

const getButtonSize = (size: SizeType) => {
	switch (size) {
		case 'sm':
			return {
				padding: '2rem',
				fontSize: '2rem',
			};
		case 'md':
			return {
				padding: '2rem',
				fontSize: '2rem',
			};
		case 'lg':
			return {
				padding: '2rem',
				fontSize: '2rem',
			};
	}
};
