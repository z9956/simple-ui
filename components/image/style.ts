import { css, cx } from '@emotion/css';
import { defaultStyles } from '../styles/default';

export const getImageStyles = () => {
	return {
		image: cx(
			css`
				width: 200px;
				height: auto;
				cursor: pointer;
				display: inline-flex;
				box-sizing: border-box;
				font-size: 0;
				position: relative;

				> img {
					width: 100%;
					height: 100%;
					object-fit: cover;
					box-sizing: border-box;
				}

				> .image-mask {
					display: none;
					width: 100%;
					height: 100%;
					position: absolute;
					top: 0;
					left: 0;
					background-color: rgba(0, 0, 0, 0.5);
					caret-color: transparent;
					user-select: none;

					> span {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						color: #fff;
						font-size: ${defaultStyles.fontSize};
					}
				}

				:hover > .image-mask {
					display: block;
				}
			`,
		),
		err: css`
			width: 200px;
			height: 200px;
			background-color: rgb(245, 245, 245);
			position: relative;
			box-sizing: border-box;

			> span {
				width: 60px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				box-sizing: border-box;

				> svg {
					width: 100%;
					height: auto;
					fill: #ccc;
				}
			}
		`,
	};
};

export const getPreviewStyles = () => {
	return {
		modal: css`
			user-select: none;

			.image-mask {
				position: fixed;
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				overflow: auto;
				inset: 0;
				background-color: black;
				pointer-events: none;
				opacity: 0.25;
				z-index: 1000;
				-webkit-tap-highlight-color: transparent;
			}

			.image-content {
				width: 100%;
				height: 100%;
				position: absolute;
				overflow: hidden;
				inset: 0;
				opacity: 1;
				z-index: 1000;

				> img {
					position: absolute;
					top: 50%;
					left: 50%;
					transform-origin: 0 0;
					transition: transform 0.3s ease-in-out;
				}

				.left-icon {
					width: 40px;
					height: 40px;
					cursor: pointer;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					background-color: rgba(0, 0, 0, 0.5);
					position: absolute;
					top: 50%;
					left: 10px;
					transform: translateY(-50%);
				}

				.right-icon {
					left: auto;
					right: 10px;
				}

				.left-icon.disabled {
					cursor: not-allowed;
					color: gray;
				}

				.operations {
					list-style: none;
					box-sizing: border-box;
					margin: 0;
					display: flex;
					position: absolute;
					top: 0;
					right: 0;
					z-index: 1;

					li {
						width: 42px;
						height: 42px;
						padding: 12px;
						margin-left: 12px;
						list-style: none;
						box-sizing: border-box;
						cursor: pointer;
						color: #fff;

						> svg {
							width: 18px;
							height: 18px;
						}
					}
				}
			}
		`,
	};
};
