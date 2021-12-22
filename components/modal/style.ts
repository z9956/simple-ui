import { css, cx } from '@emotion/css';

import { defaultStyles } from '../styles/default';

export const getTextareaStyles = () => {
	return {
		visible: css`
			opacity: 0;
			display: none;
		`,
		wrap: cx(
			css`
				position: fixed;
				top: 0;
				overflow: auto;
				width: 100%;
				height: 100%;
				opacity: 1;
				font-size: ${defaultStyles.fontSize};
				border-right: 5px;
				&,
				* {
					box-sizing: border-box;
				}

				.modal {
					width: 500px;
					position: relative;
					top: 30%;
					left: 50%;
					transform: translate(-50%, -50%);
					background-color: ${defaultStyles.background};
					z-index: 1000;
				}

				.modal-header {
					display: flex;
					justify-content: space-between;
					padding: 10px 16px;
					border-bottom: 1px solid ${defaultStyles.defaultBorder};

					> h4 {
						margin: 0;
						font-size: 16px;
					}

					.modal-close {
						width: 16px;
						height: 16px;
						cursor: pointer;

						svg {
							width: 100%;
							height: 100%;
						}
					}
				}

				.modal-mask {
					position: fixed;
					overflow: auto;
					width: 100%;
					height: 100%;
					inset: 0;
					background-color: black;
					pointer-events: none;
					opacity: 0.25;
					z-index: 1000;
					-webkit-tap-highlight-color: transparent;
				}

				.modal-body {
					padding: 20px;
				}

				.modal-footer {
					display: flex;
					justify-content: flex-end;
					border-top: 1px solid ${defaultStyles.defaultBorder};
					padding: 10px 12px;

					.modal-confirm {
						margin-left: 10px;
					}
				}
			`,
		),
	};
};
