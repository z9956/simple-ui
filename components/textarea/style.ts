import { css, cx } from '@emotion/css';

import { defaultStyles } from '../styles/default';

export const getTextareaStyles = () => {
	const disabledStyles = {
		color: '#ccc',
		cursor: 'not-allowed',
		borderColor: defaultStyles.disabled,
		background: defaultStyles.disabledBorder,
	};

	const prefixStyles = css`
		display: inline-flex;
		flex-shrink: 0;
		height: 100%;
		align-items: center;
		justify-content: center;
		margin: 0;
		padding: 0;
		line-height: 1;
		cursor: pointer;
		z-index: 1;
		font-size: ${defaultStyles.fontSize};
	`;

	return {
		input: cx(
			css`
				display: inline-flex;
				align-items: center;
				width: 100%;
				border: 1px solid ${defaultStyles.defaultBorder};
				border-radius: 2px;
				font-size: ${defaultStyles.fontSize};

				&,
				* {
					box-sizing: border-box;
				}
			`,
		),
		disabled: css({
			...disabledStyles,
		}),
		prefix: cx(
			prefixStyles,

			css`
				width: 16px;
				cursor: pointer;
				margin-right: 4px;
			`,
		),
		suffix: cx(
			prefixStyles,

			css`
				width: 32px;
				cursor: pointer;
				height: 100%;
			`,
		),
		clear: cx(
			prefixStyles,

			css`
				width: 20px;

				> svg {
					pointer-events: auto;
				}
			`,
		),

		inputWarp: css`
			> textarea {
				width: 100%;
				height: 100%;
				border: none;

				&:focus {
					outline: none;
					caret-color: black;
				}

				&:disabled {
					caret-color: transparent;
					cursor: not-allowed;
				}
			}
		`,
		focused: css`
			border-color: ${defaultStyles.primary};
		`,
	};
};
