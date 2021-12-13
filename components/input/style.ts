import { css, cx } from '@emotion/css';

import { defaultStyles } from '../styles/default';
import { notAllowed } from '../styles/mixins';

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
		position: relative;
		z-index: 1;

		> svg {
			//pointer-events: none;
		}
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
				padding: 4px 11px;

				> input {
					width: 100%;
					height: 100%;

					border: none;

					&:focus {
						outline: none;
						border-color: ${defaultStyles.primary};
					}
				}
			`,
		),
		disabled: css({
			notAllowed,
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
			`,
		),
	};
};
