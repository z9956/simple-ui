import { forwardRef, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import Input, { InputProps } from './Input';

export type PasswordProps = InputProps;

const Password = forwardRef<HTMLInputElement, PasswordProps>((props, ref) => {
	const { disabled, ...otherProps } = props;

	const [visible, setVisible] = useState<boolean>(false);

	const handleVisible = () => {
		if (disabled) return;

		setVisible((state) => !state);
	};

	const renderIcon = () => {
		return visible ? (
			<AiFillEye onClick={handleVisible} />
		) : (
			<AiFillEyeInvisible onClick={handleVisible} />
		);
	};

	return (
		<Input
			type={visible ? 'text' : 'password'}
			disabled={disabled}
			suffix={renderIcon()}
			{...otherProps}
		/>
	);
});

Password.displayName = 'Password';

export default Password;
