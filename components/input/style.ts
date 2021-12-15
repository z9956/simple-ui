import { css, cx } from '@emotion/css';

import { defaultStyles } from '../styles/default';

export const getInputStyles = ({ width }: { width: number | string }) => {
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
	`;

	return {
		input: cx(
			css`
				display: flex;
				align-items: center;
				width: ${width ? width : '100%'};
				border: 1px solid ${defaultStyles.defaultBorder};
				border-radius: 2px;

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
			width: 100%;
			height: 30px;
			display: flex;
			align-items: center;
			padding-left: 10px;
			border: 1px solid transparent;

			> input {
				width: 100%;
				height: 100%;
				//caret-color: transparent;
				border: none;

				&:focus {
					outline: none;
					caret-color: black;
				}
			}
		`,
		focused: css`
			border-color: ${defaultStyles.primary};
		`,
	};
};
