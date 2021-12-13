import { CSSObject, css } from '@emotion/css';

export const pointer = css`
	cursor: pointer;
`;

export const notAllowed = css`
	cursor: not-allowed;
`;

export const flex = ({
	justifyContent = 'space-between',
	alignItems = 'center',
}: {
	justifyContent?: string;
	alignItems?: string;
}): CSSObject => {
	return {
		display: 'flex',
		// flexDirection: $direction,
		justifyContent,
		alignItems,
	};
};
