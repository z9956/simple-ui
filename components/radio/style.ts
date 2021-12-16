import { css } from '@emotion/css';
import { defaultStyles } from '../styles/default';

export const getRadioStyles = () => {
	return {
		wrap: css`
			display: inline-flex;
			height: 16px;
			cursor: pointer;

			&,
			* {
				box-sizing: border-box;
			}

			input[type='radio'] {
				width: 16px;
				height: 16px;
				cursor: pointer;
				outline: none;
				margin: 0;
			}
		`,

		disabled: css`
			cursor: not-allowed;
			color: ${defaultStyles.disabledColor};

			input[type='radio'] {
				cursor: not-allowed;
				background-color: ${defaultStyles.disabled};
			}
		`,

		label: css`
			padding: 0 8px;
			font-size: 14px;
			user-select: none;
			display: inline-flex;
			align-items: center;
		`,
	};
};
