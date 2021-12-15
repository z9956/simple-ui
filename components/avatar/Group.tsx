import { ReactNode, FC, HTMLAttributes, Children } from 'react';
import { cx } from '@emotion/css';

import { Avatar } from '../index';
import { getGroupStyles } from './style';

export interface BaseButtonProps {
	maxCount?: number;
	className?: string;
	children?: ReactNode;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof BaseButtonProps>;

export type GroupProps = BaseButtonProps & NativeAttrs;

const Group: FC<GroupProps> = (props) => {
	const { className, maxCount = 0, children } = props;

	const styles = getGroupStyles();

	const childrenCount = Children.count(children);

	if (childrenCount > maxCount) {
		return (
			<div className={cx(styles.group, className)}>
				{Children.map(children, (child, index) => {
					if (index < maxCount) {
						return child;
					}
				})}
				<Avatar style={{ backgroundColor: '#ccc' }}>{`+${
					childrenCount - maxCount
				}`}</Avatar>
			</div>
		);
	}

	return <div className={cx(styles.group, className)}>{children}</div>;
};

Group.displayName = 'Group';

export default Group;
