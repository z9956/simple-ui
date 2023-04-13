import { css } from '@emotion/css';
import { defaultStyles } from '../styles/default';

export const getAvatarStyles = ({ square }: { square: boolean }) => {
	return {
		avatar: css`
			width: 36px;
			height: 36px;
			display: inline-block;
			border-radius: ${square ? 0 : '50%'};
			overflow: hidden;
			position: relative;
			font-size: ${defaultStyles.fontSize};

			&,
			* {
				box-sizing: border-box;
			}

			> img,
			> svg {
				width: 100%;
				height: 100%;
			}
		`,
		text: css`
			position: absolute;
			line-height: 36px;
			left: 50%;
			transform-origin: 0 center;
			transform: scale(1) translateX(-50%);
		`,
	};
};

export const getGroupStyles = () => {
	return {
		group: css`
			box-sizing: border-box;

			> span {
				margin: 0 0 0 calc(-10px);
				border: 1px solid #fff;
			}

			> span:first-child {
				margin-left: 0;
			}

			//&, * {
			//  box-sizing: border-box;
			//}
		`,
	};
};
