import { SizeType } from '../config/size';
import { ButtonType } from './button';

export type StyleProps = {
	size: SizeType;
	type?: ButtonType;
};

const getDisabledStyles = () => {};

const getVariantStyles = (size: SizeType) => {
	switch (size) {
		case 'sm':
			return {
				padding: '2rem',
				fontSize: '2rem',
			};
	}
};

export const getButtonStyles = (props: StyleProps) => {
	const { size } = props;
	const {} = getButtonSize(size);

	return {
		button: {
			cursor: 'pointer',
		},
	};
};

const getButtonSize = () => {};
