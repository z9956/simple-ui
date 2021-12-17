import { cx, css } from '@emotion/css';
import { disabledStyles } from '../button/style';
import { defaultStyles } from '../styles/default';

export const getUploadStyles = () => {
	return {
		wrap: cx(
			css`
				width: 100%;
				font-size: ${defaultStyles.fontSize};
				display: inline-block;
			`,
		),

		upload: css`
			display: none;
		`,

		files: css`
			width: 100%;
		`,
		file: css`
			width: 100%;
			height: 22px;
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: ${defaultStyles.defaultColor};

			.name {
				width: auto;
				padding: 0 8px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}

			&:hover {
				background-color: ${defaultStyles.hoverColor};
			}
		`,

		disabled: css`
			cursor: not-allowed;

			> button {
				cursor: not-allowed;

				${css({ ...disabledStyles })}
			}
		`,
		remove: css`
			cursor: pointer;
			display: inline-flex;

			&:hover {
				color: ${defaultStyles.primary};
			}
		`,
	};
};
