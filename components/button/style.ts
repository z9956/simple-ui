import { SizeType } from '../config/size';
import { ButtonType } from './button';

export type StyleProps = {
	size: SizeType;
	type?: ButtonType;
};

export const getButtonStyles = (props: StyleProps) => {
	return {
		button: {},
	};
};
