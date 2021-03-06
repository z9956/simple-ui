import { css } from '@emotion/css';
import { defaultStyles } from '../styles/default';

export const getCheckboxStyles = () => {
	return {
		wrap: css`
			display: inline-flex;
			height: 16px;
			cursor: pointer;
			font-size: ${defaultStyles.fontSize};

			&,
			* {
				box-sizing: border-box;
			}

			input[type='checkbox'] {
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

			input[type='checkbox'] {
				cursor: not-allowed;
				background-color: ${defaultStyles.disabled};
			}
		`,
		label: css`
			padding: 0 8px;
			user-select: none;
			display: inline-flex;
			align-items: center;
			font-size: ${defaultStyles.fontSize};
		`,
	};
};
