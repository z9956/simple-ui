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
		wrap: css`
			padding-right: 0;
		`,
		input: cx(
			css`
				display: flex;
				align-items: center;
				width: ${width ? width : '100%'};
				box-sizing: border-box;
				border: 1px solid ${defaultStyles.defaultBorder};
				border-radius: 2px;

				&:focus {
					caret-color: transparent;
					border: 1px solid ${defaultStyles.primary};
				}

				> input {
					width: 100%;
					height: 100%;
					padding: 4px 11px;
					caret-color: transparent;
					border: 1px solid transparent;

					&:focus {
						outline: none;
						caret-color: black;
						border-color: ${defaultStyles.primary};
					}
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
				//border-left: 1px solid ${defaultStyles.defaultBorder};
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
		focused: css``,
	};
};
