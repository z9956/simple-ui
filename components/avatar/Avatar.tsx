import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cx } from '@emotion/css';

import { getAvatarStyles } from './style';

export interface BaseButtonProps {
	className?: string;
	children?: ReactNode;
}

export type AvatarProps = BaseButtonProps &
	ButtonHTMLAttributes<HTMLDivElement>;

const Avatar = forwardRef<HTMLButtonElement, AvatarProps>((props, ref) => {
	const { className, children, ...otherProps } = props;

	const styles = getAvatarStyles();

	return (
		<div className={cx(styles.avatar, className)} {...otherProps}>
			{children && <span>{children}</span>}
		</div>
	);
});

Avatar.displayName = 'Avatar';

export default Avatar;
