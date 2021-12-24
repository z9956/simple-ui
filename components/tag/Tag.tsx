import { FC, HTMLAttributes, ReactNode } from 'react';
import { cx } from '@emotion/css';

import { buttonTypes } from '../button/Button';
import { getTagStyles } from './style';

export type VariantType = typeof buttonTypes[number];

export interface BaseTagProps {
	className?: string;
	color?: string;
	type?: VariantType;
	children?: ReactNode;
}

type NativeAttrs = Omit<HTMLAttributes<any>, 'type'>;

export type TagProps = BaseTagProps & NativeAttrs;

const Tag: FC<TagProps> = (props) => {
	const {
		type = 'secondary',
		color,
		children,
		className,
		...otherProps
	} = props;

	const styles = getTagStyles(type, color);

	return (
		<span className={cx(styles.tag, className)} {...otherProps}>
			{children}
		</span>
	);
};

Tag.displayName = 'Tag';

export default Tag;
