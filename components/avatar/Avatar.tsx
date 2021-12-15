import {
	ImgHTMLAttributes,
	ReactNode,
	FC,
	isValidElement,
	CSSProperties,
	SyntheticEvent,
} from 'react';
import { cx } from '@emotion/css';

import { getAvatarStyles } from './style';

export interface BaseAvatarProps {
	icon?: ReactNode;
	size?: number;
	src?: string;
	shape?: 'circle' | 'square';
	className?: string;
	children?: ReactNode;
}

type NativeAttrs = Omit<
	ImgHTMLAttributes<HTMLImageElement>,
	keyof BaseAvatarProps
>;

export type AvatarProps = BaseAvatarProps & NativeAttrs;

const Avatar: FC<AvatarProps> = (props) => {
	const {
		src,
		alt,
		size,
		icon,
		style,
		shape = 'circle',
		className,
		children,
		onError,
		...otherProps
	} = props;

	const sizeStyles: CSSProperties =
		typeof size === 'number'
			? {
					width: size,
					height: size,
					lineHeight: `${size}px`,
					fontSize: icon ? size / 2 : 18,
			  }
			: {};

	const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
		onError?.(e);
	};

	const isReactNode = isValidElement(icon);

	const styles = getAvatarStyles({ square: shape === 'square' });

	let childrenToRender;

	if (isReactNode) {
		childrenToRender = icon;
	} else if (src) {
		childrenToRender = <img src={src} alt={alt} onError={handleError} />;
	} else {
		if (typeof children === 'string') {
			childrenToRender = <span className={styles.text}>{children}</span>;
		} else {
			childrenToRender = children;
		}
	}

	return (
		<span
			className={cx(styles.avatar, className)}
			style={{ ...sizeStyles, ...style }}
			{...otherProps}
		>
			{childrenToRender}
		</span>
	);
};

Avatar.displayName = 'Avatar';

export default Avatar;
