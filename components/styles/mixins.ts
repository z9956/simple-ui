import { CSSObject } from '@emotion/css';

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
